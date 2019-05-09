import { Question } from "./Question.model";
import { Choice } from "./Choice.model";
import { IMasterBallotData } from "./abstractions/IMasterBallotData";
import { Category } from "../common/value-objects/CategoryVO.model";
import { Entity } from "../../../../../shared-kernel/entities/Entity.model";
import {IClonable} from "../../../../../shared-kernel/interfaces/IClonable";

export class MasterBallot extends Entity implements IClonable<MasterBallot> {

	constructor(
		id: string,
		public author: string,
		public title: string,
		public description: string,
		public category: Category,
		public dateCreated: Date,
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
						)
					}),
				);
			}
		);
	}

	get questionCount() {
		return this.questions.length;
	}

	// Factory method is only for the very first time entity is created.
	// Otherwise re-hydrate with constructor as per DDD practice.
	static create(
		idGenerator: () => string,
		sData: IMasterBallotData
		): MasterBallot {

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
						);
					});

				return new Question(
					idGenerator(),
					qData.title,
					qData.questionType,
					choices,
				);
			});

		return new MasterBallot(
			idGenerator(),
			sData.author,
			sData.title,
			sData.description,
			new Category(sData.category),
			new Date(),
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
					);
				}
			)
		);

		this._questions.push(newQuestion);

		return true;
	}

	clone(): MasterBallot {
		const masterBallot = new MasterBallot(
			this.id,
			this.author,
			this.title,
			this.description,
			this.category,
			new Date(this.dateCreated),
			this.questions
		);

		while (masterBallot.version !== this.version) {
			masterBallot.incrementVersion();
		}

		return masterBallot;
	}

	updateBallotData(masterBallotChangeset: IMasterBallotChangeSet) {
	    this.patchBallot(masterBallotChangeset);
	}

	private patchBallot(patchBallot: IMasterBallotChangeSet) {
		for (let [key, value] of Object.entries(patchBallot)) {
			if (this.hasOwnProperty(key)) this[key] = value;
		}
	}

}

interface IMasterBallotChangeSet {
	title?: string,
	description?: string,
    category?: string,
	questions?: {
		id: string,
		title?: string,
		type?: string,
		choices?: {
			id: string,
			title?: string,
			content?: string,
			contentType?: string,
		}[]
	}[]
}
