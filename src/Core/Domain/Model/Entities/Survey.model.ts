import { Entity } from "./Entity.model";
import { Question } from "./Question.model";
import { CategoryVO } from "../ValueObjects/CategoryVO.model";
import { VoteTallyVO } from "../ValueObjects/VoteTallyVO.model";
import { Choice } from "./Choice.model";

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
		private questions: Question[],
	) {
		super(id);
	}

	// Factory method is only for the very first time entity is created.
	// Otherwise re-hydrate with constructor as per DDD practice.
	static create(
		idGenerator: () => string,
		sData: {
			author: string,
			title: string,
			description: string,
			category: string,
			anonymous: boolean,
			published: boolean,
			questionsData: {
				title: string,
				questionType: string,
				choicesData: {
					title: string,
					content: string,
					contentType: string,
					voteTally: number,
				}[]
			}[],
		}): Survey {

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

		this.questions.push(newQuestion);

		return true;
	}
}

