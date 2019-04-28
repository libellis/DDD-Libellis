import { Entity } from "../../../Common/Entities/Entity.model";
import { DateTimeRange } from "../../../../../../../SharedKernel/DateTimeRangeVO.model";
import { Ballot } from "../../Ballot/Entities/Ballot.model";
import { IBallotData } from "../../Ballot/Abstractions/IBallotData";

export class Election extends Entity {
	constructor(
		id: string,
		private _electionPeriod: DateTimeRange,
		private _anonymous: boolean,

		// For enforcing surveyId, questionId's and choiceId's matching up
		// perfectly for submitted ballot data.
		private _masterBallot: MasterBallot,

		// Array of ballot UUIDs that have been cast
		private _ballots: Set<string>,

		// Array of user UUIDs that have already voted
		private _whoVoted: Set<string>,
	) {
		super(id);
	}

	// Here is where we should enforce invariance that would check whether
	// the ballot data accurately matches the survey it should be attached to.
	castBallot(
		idGenerator: () => string,
		ballotData: IBallotData,
	) {
		// Has the user in question already voted?
		if (this._whoVoted.has(ballotData.voterId)) {
			throw new Error(`That user has already voted in this election`);
		}

		// Check if ballot data matches up with survey it should be related to.

		const ballot: Ballot = Ballot.create(
			idGenerator,
			ballotData,
		);

		this._ballots.add(ballot.id);
	}
}
