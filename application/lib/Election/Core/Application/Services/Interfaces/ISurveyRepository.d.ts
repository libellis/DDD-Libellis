import { Survey } from "../../../Domain/Model/Aggregates/Ballot/Entities/MasterBallot.model";
export interface ISurveyRepository {
    add(entity: Survey): Promise<boolean>;
    addRange(entities: Survey[]): Promise<boolean>;
    get(id: string): Promise<Survey>;
    getPagedResults(pageSize: number, pageNumber: number): Promise<Survey[]>;
    remove(id: string): Promise<boolean>;
}
