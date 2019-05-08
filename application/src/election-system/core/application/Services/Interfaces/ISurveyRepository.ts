import {MasterBallot} from "../../../domain/model/master-ballot-aggregate/MasterBallot.model";

export interface IMasterBallotRepository {
	add(entity: MasterBallot): Promise<boolean>;
	addRange(entities: MasterBallot[]): Promise<boolean>;
	get(id: string): Promise<MasterBallot>;
	getPagedResults(pageSize: number, pageNumber: number): Promise<MasterBallot[]>;
	remove(id: string): Promise<boolean>;
}
