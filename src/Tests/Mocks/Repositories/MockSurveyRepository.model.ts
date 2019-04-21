import { Survey } from "../../../Core/Domain/Model/Entities/Survey.model";
import { ISurveyRepository } from "../../../Core/Application/Services/Interfaces/ISurveyRepository";

export class MockSurveyRepository implements ISurveyRepository {
	constructor(
		private mockData: Survey[]
	) {}

	async add(entity: Survey): Promise<boolean> {
		this.mockData.push(entity);
		return true;
	}

	async addRange(entities: Survey[]): Promise<boolean> {
		this.mockData.concat(entities);
		return true;
	}

	async get(id: string): Promise<Survey> {
		const s = this.mockData.find(s => {
			return s.id === id;
		});

		// deep clone so we don't mutate survey in mockData as such mutation
		// would not affect a real repository
		return new Survey(
			s.id,
			s.author,
			s.title,
			s.description,
			s.category,
			s.datePosted,
			s.anonymous,
			s.published,

			// internal getter deep clones questions and their choices.
			s.questions,
		)
	}

	async getPagedResults(pageSize: number, pageNumber: number): Promise<Survey[]> {
		return this.mockData
			.slice(
				pageSize * (pageNumber - 1),
				pageSize * pageNumber
			);
	}

	async remove(id: string): Promise<boolean> {
		let index = this.mockData.findIndex(s => {
			return s.id === id;
		});

		const removed = this.mockData.splice(index, 1);

		return removed.length !== 0;
	}
}
