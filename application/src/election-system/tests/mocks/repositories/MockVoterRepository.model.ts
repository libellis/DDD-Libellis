import {IVoterRepository} from "../../../core/application/abstractions/IVoterRepository";
import {Voter} from "../../../core/domain/model/voter-aggregate/Voter.model";

export class MockVoterRepository implements IVoterRepository {
	private _mockData: Voter[] = [];

	constructor(
		mockData?: Voter[]
	) {
		if (mockData !== undefined) {
			this._mockData = mockData;
		}
	}

	async add(entity: Voter): Promise<boolean> {
		this._mockData.push(entity);
		return true;
	}

	async addRange(entities: Voter[]): Promise<boolean> {
		this._mockData = this._mockData.concat(entities);
		return true;
	}

	async get(id: string): Promise<Voter> {
		const v = this._mockData.find(v => {
			return v.id === id;
		});

		if (v === undefined) {
			return v;
		}

		return v.clone();
	}

	async getPagedResults(pageSize: number, pageNumber: number): Promise<Voter[]> {
		return this._mockData
			.slice(
				pageSize * (pageNumber - 1),
				pageSize * pageNumber
			)
			.map(v => {
				return v.clone();
			});
	}

	async update(entity: Voter): Promise<boolean> {
		const vIdx = this._mockData.findIndex(v => {
			return v.id === entity.id;
		});

		// Should we bother putting error return in mock repo?
		if (vIdx === -1) {
			return false;
		}

		this._mockData[vIdx] = entity;
		return true;
	}

	async remove(id: string): Promise<boolean> {
		let index = this._mockData.findIndex(v => {
			return v.id === id;
		});

		const removed = this._mockData.splice(index, 1);

		return removed.length !== 0;
	}
}
