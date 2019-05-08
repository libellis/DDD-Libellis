import { Election } from "../../../../../core/domain/model/election-aggregate/Election.model";
import * as faker from 'faker';
import { EventBus } from "../../../../../../shared-kernel/event-streams/EventBus";
import { MasterBallot } from "../../../../../core/domain/model/master-ballot-aggregate/MasterBallot.model";
import {IBallotData} from "../../../../../core/domain/model/ballot-aggregate/abstractions/IBallotData";
import {Ballot} from "../../../../../core/domain/model/ballot-aggregate/Ballot.model";
import {Voter} from "../../../../../core/domain/model/voter-aggregate/Voter.model";
import {TestBallotDataFactory} from "./TestBallotDataFactory.model";
import {TestVoterFactory} from "./TestVoterFactory.model";
import {TestMasterBallotFactory} from "./TestMasterBallotFactory.model";

export class TestElectionFactory {

	// MasterBallot will likely come during testing from a generation via the TestMasterBallotFactory.
	static createElectionWithFactoryMethod(masterBallot: MasterBallot, optionalParams?: OptionalParams): Election {
		const start = faker.date.recent(1);
		const end = new Date(start.getTime() + faker.random.number({min: 86410000, max: 604800000}));

		let eData = {
			id: faker.random.uuid,
			start,
			end,
			anonymous: faker.random.boolean(),
			masterBallot,
			ballotCastEventBus: new EventBus()
		};

		if (optionalParams !== undefined) {
			TestElectionFactory.patchObject(eData, optionalParams);
		}

		return Election.create(
			eData.id,
			eData.start,
			eData.end,
			eData.anonymous,
			eData.masterBallot,
			eData.ballotCastEventBus,
			);
	}

	static createRestrictedElectionWithFactoryMethod(masterBallot: MasterBallot, permittedVoters: Set<string>, optionalParams?: OptionalParams): Election {
		const start = faker.date.recent(1);
		const end = new Date(start.getTime() + faker.random.number({min: 86410000, max: 604800000}));

		let eData = {
			id: faker.random.uuid,
			start,
			end,
			anonymous: faker.random.boolean(),
			permittedVoters,
			masterBallot,
			ballotCastEventBus: new EventBus()
		};

		if (optionalParams !== undefined) {
			TestElectionFactory.patchObject(eData, optionalParams);
		}

		return Election.create(
			eData.id,
			eData.start,
			eData.end,
			eData.anonymous,
			eData.masterBallot,
			eData.ballotCastEventBus,
			eData.permittedVoters,
		);
	}

	// This allows us to patch our generated masterBallots/questions/choices with optional passed
	// in static values.
	static patchObject(inputObj: object, patchObj: object) {
		for (let [key, value] of Object.entries(patchObj)) {
			if (inputObj.hasOwnProperty(key)) inputObj[key] = value;
		}
	}

	// Should this be here or in the election test factory model?
	static castBallot(election: Election, ballotData: IBallotData): Ballot {
		return election.castBallot(
			faker.random.uuid,
			ballotData
		);
	}

	static castBallots(election: Election, ballotDatas: IBallotData[]): Ballot[] {
		return ballotDatas.map(b => {
			return TestElectionFactory.castBallot(election, b);
		});
	}

	// This is a very meta method that handles all the steps leading up to and including
	// casting a ballot.  It returns all relevant class instances stored in an object.
	// Intention is to destructure what you need from the final output object
	static createElectionAndCastBallot(): ElectionData {
		const eventBus = new EventBus();

		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, {ballotCastEventBus: eventBus});
		const voter = TestVoterFactory.createTestVoter();
		const ballotData = TestBallotDataFactory.createTestBallot(voter.id, masterBallot);
		const ballot = TestElectionFactory.castBallot(election, ballotData);

		return {
			election,
			masterBallot,
			ballot,
			voter,
			eventBus
		}
	}

	static createElectionAndCastBallots(): ElectionDatas {
		const eventBus = new EventBus();

		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, {ballotCastEventBus: eventBus});
		const voters = TestVoterFactory.createRandomTestVoters(6, 12);
		const ballotDatas = TestBallotDataFactory.createTestBallotsFromVotersList(voters, masterBallot);
		const ballots = TestElectionFactory.castBallots(election, ballotDatas);

		return {
			election,
			masterBallot,
			ballots,
			voters,
			eventBus
		}
	}
}

interface OptionalParams {
	start?: Date,
	end?: Date,
	anonymous?: boolean,
	ballotCastEventBus?: EventBus,
}

interface ElectionData {
	election: Election,
	masterBallot: MasterBallot,
	ballot: Ballot,
	voter: Voter,
	eventBus: EventBus,
}

interface ElectionDatas {
	election: Election,
	masterBallot: MasterBallot,
	ballots: Ballot[],
	voters: Voter[],
	eventBus: EventBus,
}
