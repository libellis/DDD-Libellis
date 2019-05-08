import { Ballot } from "../../domain/model/ballot-aggregate/Ballot.model";

export interface IBallotRepository {
	add(entity: Ballot): Promise<boolean>;
	addRange(entities: Ballot[]): Promise<boolean>;
	get(id: string): Promise<Ballot>;
	getPagedResults(pageSize: number, pageNumber: number): Promise<Ballot[]>;
	update(entity: Ballot): Promise<boolean>;
	remove(id: string): Promise<boolean>;
}
