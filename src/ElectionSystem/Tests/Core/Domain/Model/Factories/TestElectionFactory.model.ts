import { Election } from "../../../../../Core/Domain/Model/ElectionAggregate/Election.model";
import * as faker from 'faker';
import { BallotCastEventBus } from "../../../../../../SharedKernel/EventStreams/BallotCastEventBus";
import { MasterBallot } from "../../../../../Core/Domain/Model/MasterBallotAggregate/MasterBallot.model";

export class TestElectionFactory {

	// MasterBallot will likely come during testing from a generation via the TestMasterBallotFactory.
	static createElectionWithFactory(masterBallot: MasterBallot, optionalParams?: OptionalParams): Election {
		const start = faker.date.recent(1);
		const end = new Date(start.getTime() + faker.random.number({min: 86410000, max: 604800000}));

		let eData = {
			id: faker.random.uuid,
			start,
			end,
			anonymous: faker.random.boolean(),
			masterBallot,
			ballotCastEventBus: new BallotCastEventBus()
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
	ballotCastEventBus?: BallotCastEventBus,
}
