import {IElectionRepository} from "../../../core/application/abstractions/IElectionRepository";
import {Election} from "../../../core/domain/model/election-aggregate/Election.model";

export class MockElectionRepository implements IElectionRepository {
	private _mockData: Election[] = [];

	// TODO: Refactor event bus out so it gets injected into Election on creation by injection framework.
	constructor(
		mockData?: Election[]
	) {
		if (mockData !== undefined) {
			this._mockData = mockData;
		}
	}

	async add(entity: Election): Promise<boolean> {
		this._mockData.push(entity);
		return true;
	}

	async addRange(entities: Election[]): Promise<boolean> {
		this._mockData = this._mockData.concat(entities);
		return true;
	}

	async get(id: string): Promise<Election> {
		const s = this._mockData.find(s => {
			return s.id === id;
		});

		if (s === undefined) {
			return s;
		}

		return s.clone();
	}

	async getPagedResults(pageSize: number, pageNumber: number): Promise<Election[]> {
		return this._mockData
			.slice(
				pageSize * (pageNumber - 1),
				pageSize * pageNumber
			);
	}

	async remove(id: string): Promise<boolean> {
		let index = this._mockData.findIndex(s => {
			return s.id === id;
		});

		const removed = this._mockData.splice(index, 1);

		return removed.length !== 0;
	}
}
