import {Voter} from "../../../../core/domain/model/voter-aggregate/Voter.model";
import {NewMasterBallot} from "../../../../core/application/models/input/NewMasterBallot";
import * as faker from 'faker';

export class TestNewMasterBallotDataFactory {
	static createTestNewMasterBallotData(): NewMasterBallot {
		return {
			title: faker.random.word(),
			description: faker.random.words(5),
			category: faker.random.word(),
			questionsData: TestNewMasterBallotDataFactory.createRandomQuestionsWithChoices(),
		};
	}

	private static createRandomQuestionsWithChoices() {
		const randomArray = Array(faker.random.number({min: 2, max: 12, precision: 1})).fill(0);

		return randomArray.map(data => {
			const questionData = {
				title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
				questionType: faker.random.word(),
				choicesData: TestNewMasterBallotDataFactory.createRandomChoices(),
			};

			return questionData;
		});
	}

	private static createRandomChoices() {
		const randomArray = Array(faker.random.number({min: 2, max: 12, precision: 1})).fill(0);

		return randomArray.map(data => {
			const choiceData =  {
				title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
				content: faker.lorem.words(Math.floor(Math.random() * (20 - 8)) + 3),
				contentType: faker.random.word(),
			};

			return choiceData;
		});
	}
}
