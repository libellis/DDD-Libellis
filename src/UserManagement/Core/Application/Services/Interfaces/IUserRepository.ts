import { User } from "../../../Domain/Model/Aggregates/User/Entities/User.model";

export interface IUserRepository {
	add(entity: User): Promise<boolean>;
	addRange(entities: User[]): Promise<boolean>;
	get(id: string): Promise<User>;
	remove(id: string): Promise<boolean>;
}
