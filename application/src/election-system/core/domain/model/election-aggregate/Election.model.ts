import { Entity } from "../../../../../shared-kernel/Entity.model";
import { DateTimeRange } from "../../../../../shared-kernel/value-objects/DateTimeRange.model";
import { Ballot } from "../ballot-aggregate/Ballot.model";
import { IBallotData } from "../ballot-aggregate/abstractions/IBallotData";
import { MasterBallot } from "../master-ballot-aggregate/MasterBallot.model";
import { Guard } from "../../../../../shared-kernel/Guard.model";
import { EventBus } from "../../../../../shared-kernel/event-streams/EventBus";
import { BallotCastEvent } from "../events/BallotCastEvent.model";
import { Teller } from "./Teller.model";
import {IClonable} from "../../../../../shared-kernel/interfaces/IClonable";
import {NotAuthorizedError} from "../../../../../shared-kernel/exceptions/NotAuthorizedError.model";

export class Election extends Entity implements IClonable<Election> {
	private _electionPeriod: DateTimeRange;
	private _anonymous: boolean;
	public readonly _masterBallotId: string;
	public readonly _creator: string;

	private _restricted: boolean;
	private _permittedVoters: Set<string>;

	private _validQuestionIds: Set<string>;
	private _validChoiceIds: Set<string>;

	// Array of ballot UUIDs that have been cast.
	private _ballotIds: Set<string>;

	// Array of user UUIDs that have already voted
	private _whoVotedIds: Set<string>;

	private _teller: Teller;

	// We need the ballot cast event but so we can subscribe to it
	// and update our list of who has voted
	private readonly _eventBus: EventBus;

	constructor(
		id: string,
		electionPeriod: DateTimeRange,
		anonymous: boolean,
		masterBallotId: string,
		creator: string,

		restricted: boolean,
		permittedVoters: Set<string>,

		validQuestionIds: Set<string>,
		validChoiceIds: Set<string>,

		// Array of ballot UUIDs that have been cast.
		ballotIds: Set<string>,

		// Array of user UUIDs that have already voted
		whoVotedIds: Set<string>,

		teller: Teller,

		// We need the ballot cast event but so we can subscribe to it
		// and update our list of who has voted
		eventBus: EventBus,
	) {
		super(id);

		// subscribe to event bus here so we are ready to record who has already voted as
		// early as possible.  Any better ideas for where to subscribe?
		this._eventBus = eventBus;
		this.subscribeToBallotCastEventStream();

		this._electionPeriod = electionPeriod;
		this._anonymous = anonymous;
		this._masterBallotId = masterBallotId;
		this._creator = creator;
		this._restricted = restricted;
		this._permittedVoters = permittedVoters;
		this._validQuestionIds = validQuestionIds;
		this._validChoiceIds = validChoiceIds;
		this._ballotIds = ballotIds;
		this._whoVotedIds = whoVotedIds;
		this._teller = teller;
	}

	get startDate(): Date {
		return this._electionPeriod._start;
	}

	get endDate(): Date {
		return this._electionPeriod._end;
	}

	get masterBallotId(): string {
		return this._masterBallotId;
	}

	get anonymous(): boolean {
		return this._anonymous;
	}

	get restricted(): boolean {
		return this._restricted;
	}

	get permittedVoters(): Set<string> {
		return this._permittedVoters;
	}

	get tellerId(): string {
		return this._teller.id;
	}

	get creator(): string {
		return this._creator;
	}

	get isActive(): boolean {
		return this._electionPeriod.currentlyIn();
	}

	// Factory method for enforcing invariance:
	// 1. Start and end date validity is checked by DateTimeRange VO
	static create(
		idGenerator: () => string,
		start: Date,
		end: Date,
		anonymous: boolean,
		masterBallot: MasterBallot,
		eventBus: EventBus,
		permittedVoters?: Set<string>,
	): Election {
		const validQuestionIds: Set<string> = new Set(masterBallot.questions.map(q => q.id));
		const validChoiceIds: Set<string> = new Set();
		for (const question of masterBallot.questions) {
			for (const choice of question.choices) {
				validChoiceIds.add(choice.id);
			}
		}
		const teller = new Teller(idGenerator(), validChoiceIds, eventBus);
		let restricted = false;

		if (permittedVoters === undefined) {
			permittedVoters = new Set();
		} else {
			restricted = true;
		}

		return new Election(
			idGenerator(),
			new DateTimeRange(start, end),
			anonymous,
			masterBallot.id,
			masterBallot.author,
			restricted,
			permittedVoters,
			validQuestionIds,
			validChoiceIds,
			new Set(),
			new Set(),
			teller,
			eventBus
			);
	}

	startElection() {
		if (this._electionPeriod.currentlyIn()) {
			this._teller.beginCounting();
		}
	}

	// Here is where we should enforce invariance that would check whether
	// the ballot data accurately matches the survey it should be attached to.
	castBallot(
		idGenerator: () => string,
		ballotData: IBallotData,
	): Ballot {
	    this.allowedToVoteGuard(ballotData.voterId);

		this.alreadyVotedGuard(ballotData.voterId);

		this.checkBallotDataAgainstMasterBallot(ballotData);

		this.electionActiveGuard();

		// Passed all checks so generate a new ballot using ballot factory method.
		const ballot: Ballot = Ballot.cast(
			idGenerator,
			this._eventBus,
			ballotData,
		);

		return ballot;
	}

	// Is the election restricted? If so, see if user is in permitted list
	private allowedToVoteGuard(voterId: string) {
		if (this._restricted && !this._permittedVoters.has(voterId)) {
			throw new Error(`That user is not permitted to vote in this election.`);
		}
	}

	private alreadyVotedGuard(voterId: string) {
		if (this._whoVotedIds.has(voterId)) {
			throw new Error(`That voter has already voted in this election`);
		}
	}

	private electionActiveGuard() {
		if (!this._electionPeriod.currentlyIn()) {
			throw new Error(`Cannot cast a ballot for an election that is not currently active.`)
		}
	}

	checkBallotDataAgainstMasterBallot(ballotData: IBallotData) {
	    this.correctElectionGuard(ballotData);

		const ballotQuestionIdList = this.createQuestionIdListFromBallotData(ballotData);
		const ballotQuestionIdSet: Set<string> = new Set(ballotQuestionIdList);
		Election.duplicateQuestionGuard(ballotQuestionIdList, ballotQuestionIdSet);

		this.correctQuestionsGuard(ballotQuestionIdSet);

		const ballotChoiceIdList = this.createChoiceIdListFromBallotData(ballotData);
		const ballotChoiceIdSet: Set<string> = new Set(ballotChoiceIdList);
		Election.duplicateChoiceGuard(ballotChoiceIdList, ballotChoiceIdSet);

		this.correctChoicesGuard(ballotChoiceIdSet);

		return true;
	}

	private correctElectionGuard(ballotData: IBallotData) {
		if (this._masterBallotId !== ballotData.masterBallotId) {
			throw new Error('This ballot was cast for an election that relates to a different master ballot.');
		}
	}

	private createChoiceIdListFromBallotData(ballotData: IBallotData): string[] {
		const ballotChoiceIdList: string[] = [];
		ballotData.voteData.questionsData.forEach(q => {
			q.choicesData.forEach(c => {
				ballotChoiceIdList.push(c.cId);
			})
		});
		return ballotChoiceIdList;
	}

	private createQuestionIdListFromBallotData(ballotData: IBallotData): string[] {
		return ballotData.voteData.questionsData
			.map(q => {
					return q.qId;
				}
			);
	}

	// Check for duplicate qIds indicating potential duplicate votes
	private static duplicateQuestionGuard(ballotQuestionIdList: string[], ballotQuestionIdSet: Set<string>) {
		if (ballotQuestionIdList.length !== ballotQuestionIdSet.size) {
			throw new Error('Duplicate votes in cast ballot.');
		}
	}

	// Check if question ids are a match between ballot and master ballot.
	private correctQuestionsGuard(ballotQuestionIds: Set<string>) {
		if (!Guard.setsMatch(this._validQuestionIds, ballotQuestionIds)) {
			throw new Error('The ballot cast does not completely match the master ballot for this election');
		}
	}

	// Check for duplicate cIds indicating potential duplicate votes
	private static duplicateChoiceGuard(ballotChoiceIdList: string[], ballotChoiceIdSet: Set<string>) {
		if (ballotChoiceIdList.length !== ballotChoiceIdSet.size) {
			throw new Error('Duplicate votes in cast ballot.')
		}
	}

	// Check if choice ids are a match between ballot and master ballot.
	private correctChoicesGuard(ballotChoiceIds: Set<string>) {
		if (!Guard.setsMatch(this._validChoiceIds, ballotChoiceIds)) {
			throw new Error('The ballot cast does not completely match the master ballot for this election.');
		}
	}

	// Subscribe here (one place) and add any methods for tasks we would like
	// to carry out inside the callback.
	subscribeToBallotCastEventStream() {
		this._eventBus.ballotCastEventStream
			.subscribe((ballotCastEvent: BallotCastEvent) => {
				this.recordWhoVoted(ballotCastEvent);
			})
	}

	// Records who voted in response to a ballot cast event
	recordWhoVoted(ballotCastEvent: BallotCastEvent) {
		this._whoVotedIds.add(ballotCastEvent.ballot.voterId);
		this._ballotIds.add(ballotCastEvent.ballot.id);
	}

	getElectionResults() {
		if (this._electionPeriod.currentlyAfterRange()) {
			return this._teller.results;
		} else {
			throw new NotAuthorizedError("Cannot retrieve election results until the election is over.");
		}
	}

	// Returns choice id for winning choice.  does not rule out duplicates
	getWinner() {
		let electionResults = this.getElectionResults();
		let winningScore = 0;
		let winner = '';
		for (const [choice, score] of Object.entries(electionResults)) {
			if (score.tally > winningScore) {
				winningScore = score.tally;
				winner = choice;
			}
		}
		return winner;
	}

	clone(): Election {
		const election = new Election(
			this.id,
			this._electionPeriod,
			this._anonymous,
			this._masterBallotId,
			this._creator,
			this._restricted,
			new Set(this._permittedVoters),
			new Set(this._validQuestionIds),
			new Set(this._validChoiceIds),
			new Set(this._ballotIds),
			new Set(this._whoVotedIds),
			this._teller.clone(),
			this._eventBus
		);

		while (election.version !== this.version) {
			election.incrementVersion();
		}

		return election;
	}

	updateElectionData(electionChangeset: IElectionChangeset) {
		this.patchElection(electionChangeset);
	}

	private patchElection(patchElection: IElectionChangeset) {
    if (patchElection.start) {
      if (patchElection.end) {
        this._electionPeriod = new DateTimeRange(patchElection.start, patchElection.end);
      } else {
          this._electionPeriod = new DateTimeRange(patchElection.start, this._electionPeriod._end);
      }
		}
    if (patchElection.end) {
      this._electionPeriod = new DateTimeRange(this._electionPeriod._start, patchElection.end);
    }

    if (patchElection.anonymous !== undefined) {
        this._anonymous = patchElection.anonymous;
		}

    if (patchElection.permittedVoters) {
      if (!this._restricted) this._restricted = true;

      this._permittedVoters = new Set(patchElection.permittedVoters);
		}
	}
}

interface IElectionChangeset {
	start?: Date,
	end?: Date,
	anonymous?: boolean,
	masterBallotId?: string,
	permittedVoters?: string[],
}
