import { ISurveyRepository } from "../../Interfaces/ISurveyRepository";
import { ISurveyInputData } from "../../../Models/InputObjects/ISurveyInputData";
export declare class UsersService {
    private _surveyRepository;
    constructor(_surveyRepository: ISurveyRepository);
    createSurveyByUser(surveyInputData: ISurveyInputData, userId: string): Promise<void>;
}
