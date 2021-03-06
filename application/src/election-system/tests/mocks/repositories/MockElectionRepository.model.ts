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
		const e = this._mockData.find(e => {
			return e.id === id;
		});

		if (e === undefined) {
			throw new Error(`Cannot find election by id: ${id}`);
		}

		return e.clone();
	}

	async getPagedResults(pageSize: number, pageNumber: number): Promise<Election[]> {
		return this._mockData
			.slice(
				pageSize * (pageNumber - 1),
				pageSize * pageNumber
			)
			.map(e => {
				return e.clone()
			})
	}

	async update(entity: Election): Promise<boolean> {
		const eIdx = this._mockData.findIndex(b => {
			return b.id === entity.id;
		});

		// Should we bother putting error return in mock repo?
		if (eIdx === -1) {
			return false;
		}

		this._mockData[eIdx] = entity;
		return true;
	}

	async remove(id: string): Promise<boolean> {
		let index = this._mockData.findIndex(s => {
			return s.id === id;
		});

		const removed = this._mockData.splice(index, 1);

		return removed.length !== 0;
	}
}
