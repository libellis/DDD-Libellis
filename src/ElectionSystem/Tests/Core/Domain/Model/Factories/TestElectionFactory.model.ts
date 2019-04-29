import { Election } from "../../../../../Core/Domain/Model/Aggregates/Election/Entities/Election.model";
import * as faker from 'faker';
import { DateTimeRange } from "../../../../../../SharedKernel/DateTimeRangeVO.model";
import { BallotCastEventBus } from "../../../../../../SharedKernel/EventStreams/BallotCastEventBus";
import { MasterBallot } from "../../../../../Core/Domain/Model/Aggregates/MasterBallot/Entities/MasterBallot.model";

export class TestElectionFactory {

	// Creates a fake election.  This is purely for unit testing - a real election would need to reference a valid
	// MasterBallot. See method createElectionFromMasterBallot which would likely take a MasterBallot in testing
	// generated from the TestMasterBallotFactory.
	static createFakeElection(): Election {
		const start = faker.date.recent(1);
		// end is between 1 day plus a little and 1 week from randomized start date so the election is currently active.
		const end = new Date(start.getTime() + faker.random.number({min: 86410000, max: 604800000}));
		const fakeElectionPeriod = new DateTimeRange(start, end);
		const randomArray = Array(faker.random.number({min: 2, max: 12, precision: 1})).fill(0);
		const fakeQuestionIds = new Set(randomArray.map(e => faker.random.uuid()));
		const fakeChoiceIds = new Set(randomArray.map(e => faker.random.uuid()));
		const fakeBallotIds = new Set(randomArray.map(e => faker.random.uuid()));
		const fakeVoterIds = new Set(randomArray.map(e => faker.random.uuid()));

		return new Election(
			faker.random.uuid(),
			fakeElectionPeriod,
			faker.random.boolean(),
			faker.random.uuid(),
			fakeQuestionIds,
			fakeChoiceIds,
			fakeBallotIds,
			fakeVoterIds,
			new BallotCastEventBus()
		);
	}

	// MasterBallot will likely come during testing from a generation via the TestMasterBallotFactory.
	static createElectionFromMasterBallot(masterBallot: MasterBallot): Election {
		const start = faker.date.recent(1);
		// end is between 1 day plus a little and 1 week from randomized start date so the election is currently active.
		const end = new Date(start.getTime() + faker.random.number({min: 86410000, max: 604800000}));

		return Election.create(
			faker.random.uuid,
			start,
			end,
			faker.random.boolean(),
			masterBallot,
			new BallotCastEventBus()
			);
	}
}
