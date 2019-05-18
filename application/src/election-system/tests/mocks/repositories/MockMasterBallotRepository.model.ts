import {IMasterBallotRepository} from "../../../core/application/abstractions/IMasterBallotRepository";
import {MasterBallot} from "../../../core/domain/model/master-ballot-aggregate/MasterBallot.model";

export class MockMasterBallotRepository implements IMasterBallotRepository {
	private _mockData: MasterBallot[] = [];

	constructor(
		mockData?: MasterBallot[]
	) {
		if (mockData !== undefined) {
			this._mockData = mockData;
		}
	}

	async add(entity: MasterBallot): Promise<boolean> {
		this._mockData.push(entity);
		return true;
	}

	async addRange(entities: MasterBallot[]): Promise<boolean> {
		this._mockData = this._mockData.concat(entities);
		return true;
	}

	async get(id: string): Promise<MasterBallot> {
		const b = this._mockData.find(b => {
			return b.id === id;
		});

		if (b === undefined) {
			throw new Error(`Cannot find master ballot by id: ${id}`);
		}

		return b.clone();
	}

	async getPagedResults(pageSize: number, pageNumber: number): Promise<MasterBallot[]> {
		return this._mockData
			.slice(
				pageSize * (pageNumber - 1),
				pageSize * pageNumber
			)
			.map(b => {
				return b.clone();
			});
	}

	async update(entity: MasterBallot): Promise<boolean> {
		const bIdx = this._mockData.findIndex(b => {
			return b.id === entity.id;
		});

		// Should we bother putting error return in mock repo?
		if (bIdx === -1) {
			return false;
		}

		this._mockData[bIdx] = entity;
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
