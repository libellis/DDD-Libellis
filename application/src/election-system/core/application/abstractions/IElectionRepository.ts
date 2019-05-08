import { Election } from "../../domain/model/election-aggregate/Election.model";

export interface IElectionRepository {
	add(entity: Election): Promise<boolean>;
	addRange(entities: Election[]): Promise<boolean>;
	get(id: string): Promise<Election>;
	getPagedResults(pageSize: number, pageNumber: number): Promise<Election[]>;
	remove(id: string): Promise<boolean>;
}
