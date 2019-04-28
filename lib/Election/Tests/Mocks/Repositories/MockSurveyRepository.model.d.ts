import { Survey } from "../../../Core/Domain/Model/Aggregates/Ballot/Entities/Survey.model";
import { ISurveyRepository } from "../../../Core/Application/Services/Interfaces/ISurveyRepository";
export declare class MockSurveyRepository implements ISurveyRepository {
    private mockData;
    constructor(mockData: Survey[]);
    add(entity: Survey): Promise<boolean>;
    addRange(entities: Survey[]): Promise<boolean>;
    get(id: string): Promise<Survey>;
    getPagedResults(pageSize: number, pageNumber: number): Promise<Survey[]>;
    remove(id: string): Promise<boolean>;
}
