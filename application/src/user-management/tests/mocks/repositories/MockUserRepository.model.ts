import {IUserRepository} from "../../../core/application/abstractions/IUserRepository";
import {User} from "../../../core/domain/model/user-aggregate/User.model";

export class MockUserRepository implements IUserRepository {
	private _mockData: User[] = [];

	constructor(
		mockData?: User[]
	) {
		if (mockData !== undefined) {
			this._mockData = mockData;
		}
	}

	async add(entity: User): Promise<boolean> {
		this._mockData.push(entity);
		return true;
	}

	async addRange(entities: User[]): Promise<boolean> {
		this._mockData = this._mockData.concat(entities);
		return true;
	}

	async get(id: string): Promise<User> {
		const u = this._mockData.find(u => {
			return u.id === id;
		});

		if (u === undefined) {
		  throw new Error(`User could not be found with id of: ${id}`);
		}

		return u.clone();
	}

	async getPagedResults(pageSize: number, pageNumber: number): Promise<User[]> {
		return this._mockData
			.slice(
				pageSize * (pageNumber - 1),
				pageSize * pageNumber
			)
			.map(u => {
				return u.clone();
			});
	}

	async update(entity: User): Promise<boolean> {
		const uIdx = this._mockData.findIndex(u => {
			return u.id === entity.id;
		});

		// Should we bother putting error return in mock repo?
		if (uIdx === -1) {
			return false;
		}

		this._mockData[uIdx] = entity;
		return true;
	}

	async remove(id: string): Promise<boolean> {
		let index = this._mockData.findIndex(u => {
			return u.id === id;
		});

		const removed = this._mockData.splice(index, 1);

		return removed.length !== 0;
	}
}
