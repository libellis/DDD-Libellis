import {UpdateMasterBallot} from "../../../../core/application/models/input/UpdateMasterBallot";
import * as faker from 'faker';
import {MasterBallot} from "../../../../core/domain/model/master-ballot-aggregate/MasterBallot.model";
import {Question} from "../../../../core/domain/model/master-ballot-aggregate/Question.model";
import {Choice} from "../../../../core/domain/model/master-ballot-aggregate/Choice.model";

export class TestUpdateMasterBallotDataFactory {
	static createTestUpdateMasterBallotData(masterBallot: MasterBallot): UpdateMasterBallot {
		return {
			title: faker.random.word(),
			description: faker.random.words(5),
			category: faker.random.word(),
			questionsData: TestUpdateMasterBallotDataFactory.randomizeQuestionData(masterBallot.questions),
		};
	}

	private static randomizeQuestionData(questionsData: Question[]): questionData[] {
		return questionsData.map(data => {
			return {
				id: data.id,
				title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
				questionType: faker.random.word(),
				choicesData: TestUpdateMasterBallotDataFactory.randomizeChoicesData(data.choices),
			};
		});
	}

	private static randomizeChoicesData(choices: Choice[]): choiceData[] {
		const randomArray = Array(faker.random.number({min: 2, max: 12, precision: 1})).fill(0);

		return randomArray.map(data => {
			return {
				id: data.id,
				title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
				content: faker.lorem.words(Math.floor(Math.random() * (20 - 8)) + 3),
				contentType: faker.random.word(),
			};
		});
	}
}

interface questionData {
	id: string,
	title: string,
	questionType: string,
	choicesData: choiceData[]
}

interface choiceData {
	id: string,
	title: string,
	content: string,
	contentType: string,
}
