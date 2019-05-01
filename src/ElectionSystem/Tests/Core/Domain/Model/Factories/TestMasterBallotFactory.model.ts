import * as faker from 'faker';
import { CategoryVO } from "../../../../../Core/Domain/Model/Common/ValueObjects/CategoryVO.model";
import { MasterBallot } from "../../../../../Core/Domain/Model/MasterBallotAggregate/MasterBallot.model";

export class TestMasterBallotFactory {
	static createFullMasterBallot(options?: OptionalParams): MasterBallot {
		const s = TestMasterBallotFactory.createBaseMasterBallot(
			options !== undefined ?
				options.masterBallotParams : undefined
		);

		let questions;
		if (options !== undefined) {
			questions = TestMasterBallotFactory.createRandomQuestionsWithChoices(
				(options.questionParams !== undefined ?
					options.questionParams : undefined),
				(options.choiceParams !== undefined ?
					options.choiceParams : undefined)
			);
		} else {
			questions = TestMasterBallotFactory.createRandomQuestionsWithChoices();
		}

		for (const q of questions)
			s.addQuestionWithChoices(q);

		return s;
	}

	// We create the data first because if there are optional masterBallot parameters we need
	// to mutate those with patchObject method before we pass them into the MasterBallot
	// constructor.
	static createBaseMasterBallot(masterBallotParams?: OptionalMasterBallotParams): MasterBallot {
		const sData = {
			id: faker.random.uuid(),
			author: `${faker.name.firstName()} ${faker.name.lastName()}`,
			title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
			description: faker.lorem.words(Math.floor(Math.random() * (128 - 32)) + 3),
			category: faker.lorem.word(),
			datePosted: faker.date.recent(365),
			published: faker.random.boolean(),
			anonymous: faker.random.boolean(),
			questions: [],
		};

		if (masterBallotParams !== undefined)
			TestMasterBallotFactory.patchObject(sData, masterBallotParams);

		return new MasterBallot(
			sData.id,
			sData.author,
			sData.title,
			sData.description,
			new CategoryVO(sData.category),
			sData.datePosted,
			sData.questions,
		);
	}

	private static createRandomChoices(choiceParams?: OptionalChoiceParams): ChoiceData[] {
		const randomArray = Array(faker.random.number({min: 2, max: 12, precision: 1})).fill(0);

		return randomArray.map(data => {
			const choiceData =  {
				id: faker.random.uuid(),
				title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
				content: faker.lorem.words(Math.floor(Math.random() * (20 - 8)) + 3),
				contentType: faker.random.word(),
			};

			if (choiceParams !== undefined)
				TestMasterBallotFactory.patchObject(choiceData, choiceParams);

			return choiceData;
		});
	}

	private static createRandomQuestionsWithChoices(
		questionParams?: OptionalQuestionParams,
		choiceParams?: OptionalChoiceParams): QuestionData[] {
		const randomArray = Array(faker.random.number({min: 2, max: 12, precision: 1})).fill(0);

		return randomArray.map(data => {
			const questionData = {
				id: faker.random.uuid(),
				title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
				questionType: faker.random.word(),
				choicesData: TestMasterBallotFactory.createRandomChoices(choiceParams),
			};

			if (questionParams !== undefined)
				this.patchObject(questionData, questionParams);

			return questionData;
		});
	}

	// This allows us to patch our generated masterBallots/questions/choices with optional passed
	// in static values.
	private static patchObject(inputObj: object, patchObj: object) {
		for (let [key, value] of Object.entries(patchObj)) {
			if (inputObj.hasOwnProperty(key)) inputObj[key] = value;
		}
	}
}

class QuestionData {
	id: string;
	title: string;
	questionType: string;
	choicesData: ChoiceData[]
}

class ChoiceData {
	id: string;
	title: string;
	content: string;
	contentType: string;
}

// These optional params can be supplied to the primary create, so static values you want to test with
// can be substituted in for randomly generated ones.  A good rule of thumb is to only pass in one parameter
// that you are unit testing.
interface OptionalParams {
	masterBallotParams?: OptionalMasterBallotParams,
	questionParams?: OptionalQuestionParams,
	choiceParams?: OptionalChoiceParams,
}

interface OptionalMasterBallotParams {
	id?: string,
	author?: string,
	title?: string,
	description?: string,
	category?: string,
	datePosted?: Date,
}

interface OptionalQuestionParams {
	id?: string;
	title?: string;
	questionType?: string;
}

interface OptionalChoiceParams {
	id?: string;
	title?: string;
	content?: string;
	contentType?: string;
}
