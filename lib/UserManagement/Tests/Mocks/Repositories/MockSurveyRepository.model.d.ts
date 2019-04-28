import { Survey } from "../../../Core/Domain/Model/Aggregates/MasterBallot/Entities/MasterBallot.model";
import { IUserRepository } from "../../../Core/Application/Services/Interfaces/ISurveyRepository";
export declare class MockSurveyRepository implements IUserRepository {
    private mockData;
    constructor(mockData: Survey[]);
    add(entity: Survey): Promise<boolean>;
    addRange(entities: Survey[]): Promise<boolean>;
    get(id: string): Promise<Survey>;
    getPagedResults(pageSize: number, pageNumber: number): Promise<Survey[]>;
    remove(id: string): Promise<boolean>;
}
