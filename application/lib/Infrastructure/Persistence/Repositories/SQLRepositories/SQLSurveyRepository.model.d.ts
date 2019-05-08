import { SQLRepositoryBase } from "./SQLRepositoryBase.model";
import { IRepository } from "../../../../Core/Application/Services/Interfaces/IRepository";
import { IPSQLPool } from "../../Abstractions/IPSQLPool.model";
import { Survey } from "../../../../Core/Domain/Model/Entities/Survey.model";
export declare class SQLSurveyRepository extends SQLRepositoryBase implements IRepository {
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
