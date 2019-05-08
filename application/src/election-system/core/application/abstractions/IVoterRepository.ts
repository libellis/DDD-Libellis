import {Voter} from "../../domain/model/voter-aggregate/Voter.model";

export interface IVoterRepository {
	add(entity: Voter): Promise<boolean>;
	addRange(entities: Voter[]): Promise<boolean>;
	get(id: string): Promise<Voter>;
	getPagedResults(pageSize: number, pageNumber: number): Promise<Voter[]>;
	update(entity: Voter): Promise<boolean>;
	remove(id: string): Promise<boolean>;
}
