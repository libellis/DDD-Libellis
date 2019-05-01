import { Entity } from "../Common/Entities/Entity.model";
import { DateTimeRange } from "../../../../../SharedKernel/DateTimeRangeVO.model";
import { Ballot } from "../BallotAggregate/Entities/Ballot.model";
import { IBallotData } from "../BallotAggregate/Abstractions/IBallotData";
import { MasterBallot } from "../MasterBallotAggregate/MasterBallot.model";
import { Guard } from "../../../../../SharedKernel/Guard.model";
import { BallotCastEventBus } from "../../../../../SharedKernel/EventStreams/BallotCastEventBus";
import { BallotCastEvent } from "../Events/BallotCastEvent.model";
import { Teller } from "./Teller.model";

export class Election extends Entity {

	constructor(
		id: string,
		private _electionPeriod: DateTimeRange,
		private _anonymous: boolean,
		public readonly _masterBallotId: string,

		private _validQuestionIds: Set<string>,
		private _validChoiceIds: Set<string>,

		// Array of ballot UUIDs that have been cast.
		private _ballotIds: Set<string>,

		// Array of user UUIDs that have already voted
		private _whoVotedIds: Set<string>,

		private _teller: Teller,

		// We need the ballot cast event but so we can subscribe to it
		// and update our list of who has voted
		private readonly _ballotCastEventBus: BallotCastEventBus,
	) {
		super(id);

		// subscribe to event bus here so we are ready to record who has already voted as
		// early as possible.  Any better ideas for where to subscribe?
		this._ballotCastEventBus = _ballotCastEventBus;
		this.subscribeToBallotCastEventStream();
	}

	// Factory method for enforcing invariance:
	// 1. Start and end date validity is checked by DateTimeRange VO
	static create(
		idGenerator: () => string,
		start: Date,
		end: Date,
		anonymous: boolean,
		masterBallot: MasterBallot,
		ballotCastEventBus: BallotCastEventBus,
	): Election {
		const validQuestionIds: Set<string> = new Set(masterBallot.questions.map(q => q.id));
		const validChoiceIds: Set<string> = new Set();
		for (const question of masterBallot.questions) {
			for (const choice of question.choices) {
				validChoiceIds.add(choice.id);
			}
		}
		const teller = new Teller(idGenerator(), validChoiceIds, ballotCastEventBus);

		return new Election(
			idGenerator(),
			new DateTimeRange(start, end),
			anonymous,
			masterBallot.id,
			validQuestionIds,
			validChoiceIds,
			new Set(),
			new Set(),
			teller,
			ballotCastEventBus
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
		// Has the user in question already voted?
		if (this._whoVotedIds.has(ballotData.voterId)) {
			throw new Error(`That user has already voted in this election`);
		}

		// Check if ballot data matches up with survey it should be related to.
		// Throws an error if invalid and prevents further execution
		this.checkBallotDataAgainstMasterBallot(ballotData);

		// Checks if the current time is still within the election period.
		if (!this._electionPeriod.currentlyIn()) {
			throw new Error(`Cannot cast a ballot for an election that is not currently active.`)
		}

		// Passed all checks so generate a new ballot using ballot factory method.
		const ballot: Ballot = Ballot.cast(
			idGenerator,
			this._ballotCastEventBus,
			ballotData,
		);

		// TODO: Once we have domain events setup, should emit a BallotCast event in the ballot factory
		// and subscribe to it here so that we populate our ballotIds and voterIds only once the ballot
		// has definitely been created there after further ballot side invariance checks.
		this._ballotIds.add(ballot.id);
		this._whoVotedIds.add(ballotData.voterId);

		return ballot;
	}

	checkBallotDataAgainstMasterBallot(ballotData: IBallotData) {
		if (this._masterBallotId !== ballotData.masterBallotId) {
			throw new Error('This ballot was cast for an election that relates to a different master ballot.');
		}

		// Check for duplicate qIds indicating potential duplicate votes
		const ballotQuestionIdList: string[] = ballotData.voteData.questionsData.map(q => q.qId);
		const ballotQuestionIds: Set<string> = new Set(ballotQuestionIdList);
		if (ballotQuestionIdList.length !== ballotQuestionIds.size) {
			throw new Error('Duplicate votes in cast ballot.');
		}

		// Check if question ids are a match between ballot and master ballot.
		if (!Guard.setsMatch(this._validQuestionIds, ballotQuestionIds)) {
			throw new Error('The ballot cast does not completely match the master ballot for this election');
		}

		// Check for duplicate cIds indicating potential duplicate votes
		const ballotChoiceIdList: string[] = [];
		ballotData.voteData.questionsData.forEach(q => {
				q.choicesData.forEach(c => {
					ballotChoiceIdList.push(c.cId);
				})
			});
		const ballotChoiceIds: Set<string> = new Set(ballotChoiceIdList);
		if (ballotChoiceIdList.length !== ballotChoiceIds.size) {
			throw new Error('Duplicate votes in cast ballot.')
		}

		// Check if choice ids are a match between ballot and master ballot.
		if (!Guard.setsMatch(this._validChoiceIds, ballotChoiceIds)) {
			throw new Error('The ballot cast does not completely match the master ballot for this election.');
		}

		return true;
	}

	// Subscribe here (one place) and add any methods for tasks we would like
	// to carry out inside the callback.
	subscribeToBallotCastEventStream() {
		this._ballotCastEventBus.stream
			.subscribe(ballotCastEvent => {
				this.recordWhoVoted(ballotCastEvent);
			})
	}

	// Records who voted in response to a ballot cast event
	recordWhoVoted(ballotCastEvent: BallotCastEvent) {
		this._whoVotedIds.add(ballotCastEvent.ballot.voterId);
		this._ballotIds.add(ballotCastEvent.ballot.id);
	}

	electionIsActive(): boolean {
		return this._electionPeriod.currentlyIn();
	}

	getElectionResults() {
		if (this._electionPeriod.currentlyAfterRange()) {
			return this._teller.results;
		} else {
			throw new Error("Cannot retrieve election results until the election is over.");
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
}
