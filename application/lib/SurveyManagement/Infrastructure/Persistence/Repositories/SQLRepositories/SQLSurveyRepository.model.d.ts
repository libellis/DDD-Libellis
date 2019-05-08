import { SQLRepositoryBase } from "./SQLRepositoryBase.model";
import { IPSQLPool } from "../../Abstractions/IPSQLPool.model";
import { Survey } from "../../../../Core/Domain/Model/Aggregates/Survey/Entities/Survey.model";
import { ISurveyRepository } from "../../../../Core/Application/Services/Interfaces/ISurveyRepository";
export declare class SQLSurveyRepository extends SQLRepositoryBase implements ISurveyRepository {
    constructor(_db: IPSQLPool);
    add(entity: Survey): Promise<boolean>;
    addRange(entities: Survey[]): Promise<boolean>;
    get(id: string): Promise<Survey>;
    private getQuestionsDataBySurvey;
    private getChoicesDataByQuestion;
    private attachChoiceDataToAllQuestions;
    getPagedResults(pageSize: number, pageNumber: number): Promise<Survey[]>;
    remove(id: string): Promise<boolean>;
}
