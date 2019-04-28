import * as faker from 'faker';
import { Survey } from "../../../../../Core/Domain/Model/Aggregates/Ballot/Entities/Survey.model";
import { CategoryVO } from "../../../../../Core/Domain/Model/Common/ValueObjects/CategoryVO.model";

export class TestSurveyFactory {
	static createFullSurvey(options?: OptionalParams): Survey {
		const s = TestSurveyFactory.createBaseSurvey(
			options !== undefined ?
				options.surveyParams : undefined
		);

		let questions;
		if (options !== undefined) {
			questions = TestSurveyFactory.createRandomQuestionsWithChoices(
				(options.questionParams !== undefined ?
					options.questionParams : undefined),
				(options.choiceParams !== undefined ?
					options.choiceParams : undefined)
			);
		} else {
			questions = TestSurveyFactory.createRandomQuestionsWithChoices();
		}

		for (const q of questions)
			s.addQuestionWithChoices(q);

		return s;
	}

	// We create the data first because if there are optional survey parameters we need
	// to mutate those with patchObject method before we pass them into the Survey
	// constructor.
	static createBaseSurvey(surveyParams?: OptionalSurveyParams): Survey {
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

		if (surveyParams !== undefined)
			TestSurveyFactory.patchObject(sData, surveyParams);

		return new Survey(
			sData.id,
			sData.author,
			sData.title,
			sData.description,
			new CategoryVO(sData.category),
			sData.datePosted,
			sData.published,
			sData.anonymous,
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
				voteTally: faker.random.number({min: 0, max: 10000, precision: 1})
			};

			if (choiceParams !== undefined)
				TestSurveyFactory.patchObject(choiceData, choiceParams);

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
				choicesData: TestSurveyFactory.createRandomChoices(choiceParams),
			};

			if (questionParams !== undefined)
				this.patchObject(questionData, questionParams);

			return questionData;
		});
	}

	// This allows us to patch our generated surveys/questions/choices with optional passed
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
	voteTally: number;
}

// These optional params can be supplied to the primary create, so static values you want to test with
// can be substituted in for randomly generated ones.  A good rule of thumb is to only pass in one parameter
// that you are unit testing.
interface OptionalParams {
	surveyParams?: OptionalSurveyParams,
	questionParams?: OptionalQuestionParams,
	choiceParams?: OptionalChoiceParams,
}

interface OptionalSurveyParams {
	id?: string,
	author?: string,
	title?: string,
	description?: string,
	category?: string,
	datePosted?: Date,
	anonymous?: boolean,
	published?: boolean,
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
	voteTally?: number;
}
