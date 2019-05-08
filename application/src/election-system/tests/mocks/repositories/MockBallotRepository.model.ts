import {IBallotRepository} from "../../../core/application/abstractions/IBallotRepository";
import {Ballot} from "../../../core/domain/model/ballot-aggregate/Ballot.model";

export class MockBallotRepository implements IBallotRepository {
	private _mockData: Ballot[] = [];

	// TODO: Refactor event bus out so it gets injected into Ballot on creation by injection framework.
	constructor(
		mockData?: Ballot[]
	) {
		if (mockData !== undefined) {
			this._mockData = mockData;
		}
	}

	async add(entity: Ballot): Promise<boolean> {
		this._mockData.push(entity);
		return true;
	}

	async addRange(entities: Ballot[]): Promise<boolean> {
		this._mockData = this._mockData.concat(entities);
		return true;
	}

	async get(id: string): Promise<Ballot> {
		const b = this._mockData.find(b => {
			return b.id === id;
		});

		if (b === undefined) {
			return b;
		}

		return b.clone();
	}

	async getPagedResults(pageSize: number, pageNumber: number): Promise<Ballot[]> {
		return this._mockData
			.slice(
				pageSize * (pageNumber - 1),
				pageSize * pageNumber
			)
			.map(b => {
				return b.clone();
			});
	}

	async update(entity: Ballot): Promise<boolean> {
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
