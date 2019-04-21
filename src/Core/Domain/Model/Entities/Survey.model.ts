import { Entity } from "./Entity.model";
import { Question } from "./Question.model";
import { CategoryVO } from "../ValueObjects/CategoryVO.model";
import { VoteTallyVO } from "../ValueObjects/VoteTallyVO.model";
import { Choice } from "./Choice.model";
import { ISurveyData } from "../Abstractions/ISurveyData";

export class Survey extends Entity {

	constructor(
		id: string,
		public author: string,
		public title: string,
		public description: string,
		public category: CategoryVO,
		public datePosted: Date,
		public anonymous: boolean,
		public published: boolean,
		private _questions: Question[],
	) {
		super(id);
	}

	// deep clone so any mutations by other aggregates don't change internal aggregate consistency.
	get questions(): Question[] {
		return this._questions.map(
			q => {
				return new Question(
					q.id,
					q.title,
					q.type,
					q.choices.map(c => {
						return new Choice(
							c.id,
							c.title,
							c.content,
							c.contentType,
							c.voteTally,
						)
					}),
				);
			}
		);
	}

	// Factory method is only for the very first time entity is created.
	// Otherwise re-hydrate with constructor as per DDD practice.
	static create(
		idGenerator: () => string,
		sData: ISurveyData
		): Survey {

		const questions = sData
			.questionsData
			.map(qData => {
				const choices = qData
					.choicesData
					.map(cData => {
						return new Choice(
							idGenerator(),
							cData.title,
							cData.content,
							cData.contentType,
							new VoteTallyVO(cData.voteTally)
						);
					});

				return new Question(
					idGenerator(),
					qData.title,
					qData.questionType,
					choices,
				);
			});

		return new Survey(
			idGenerator(),
			sData.author,
			sData.title,
			sData.description,
			new CategoryVO(sData.category),
			new Date(),
			sData.anonymous,
			sData.published,
			questions,
		);
	}

	addQuestionWithChoices(
		questionData: {
			id: string,
			title: string,
			questionType: string,
			choicesData: {
				id: string,
				title: string,
				content: string,
				contentType: string,
				voteTally: number,
			}[]
		},
	): boolean {
		const newQuestion = new Question(
			questionData.id,
			questionData.title,
			questionData.questionType,
			questionData.choicesData.map(
				cData => {
					return new Choice(
						cData.id,
						cData.title,
						cData.content,
						cData.contentType,
						new VoteTallyVO(cData.voteTally),
					);
				}
			)
		);

		this._questions.push(newQuestion);

		return true;
	}
}

