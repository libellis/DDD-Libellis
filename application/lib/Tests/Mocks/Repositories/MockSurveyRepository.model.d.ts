import { IRepository } from "../../../Core/Application/Services/Interfaces/IRepository";
import { Survey } from "../../../Core/Domain/Model/Entities/Survey.model";
export declare class MockSurveyRepository implements IRepository {
    private mockData;
    constructor(mockData: Survey[]);
    add(entity: Survey): Promise<boolean>;
    addRange(entities: Survey[]): Promise<boolean>;
    get(id: string): Promise<Survey>;
    getPagedResults(pageSize: number, pageNumber: number): Promise<Survey[]>;
    remove(id: string): Promise<boolean>;
}
