import { ISurveyRepository } from "../../Interfaces/ISurveyRepository";
import { Survey } from "../../../../Domain/Model/Entities/Survey.model";
import { v4 as uuid } from 'uuid';
import { ISurveyInputData } from "../../../Models/InputObjects/ISurveyInputData";

export class UsersService {
	constructor(
		private _surveyRepository: ISurveyRepository
	) {}

	async createSurveyByUser(surveyInputData: ISurveyInputData, userId: string) {
		let surveyData = { author: userId, ...surveyInputData };
		const survey = Survey.create(uuid, surveyData);
		await this._surveyRepository.add(survey);
	}
}
