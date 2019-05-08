import { Election } from "../../../../../core/domain/model/election-aggregate/Election.model";
import * as faker from 'faker';
import { EventBus } from "../../../../../../shared-kernel/event-streams/EventBus";
import { MasterBallot } from "../../../../../core/domain/model/master-ballot-aggregate/MasterBallot.model";

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
}

interface OptionalParams {
	start?: Date,
	end?: Date,
	anonymous?: boolean,
	ballotCastEventBus?: EventBus,
}