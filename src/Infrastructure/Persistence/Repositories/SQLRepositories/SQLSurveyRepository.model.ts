import { SQLRepositoryBase } from "./SQLRepositoryBase.model";
import { IPSQLPool } from "../../Abstractions/IPSQLPool.model";
import { Survey } from "../../../../Core/Domain/Model/Entities/Survey.model";
import { CategoryVO } from "../../../../Core/Domain/Model/ValueObjects/CategoryVO.model";
import { ISurveyRepository } from "../../../../Core/Application/Services/Interfaces/ISurveyRepository";

export class SQLSurveyRepository extends SQLRepositoryBase implements ISurveyRepository {

	constructor(_db: IPSQLPool){
		super(_db);
	}

	// TODO: Implement
	async add(entity: Survey): Promise<boolean> {
		return false;
	}

	// TODO: Implement
	async addRange(entities: Survey[]): Promise<boolean> {
		return false;
	}

	// This is a very rough sketch.  Ultimately we shouldn't be piping
	// database query results directly into entity constructors.  Look into
	// possibly using automapper to map to a consistent object format
	// that the constructors expect.
	async get(id: string): Promise<Survey> {
		const surveyResult = await this._db.query(
			`SELECT id,
				author,
				title,
				description,
				category,
				date_posted as datePosted,
				anonymous,
				published
		FROM surveys
		WHERE id = $1`, [id]);

		if (surveyResult.rows.length < 1) {
			throw new Error('Not Found');
		}

		const sData = surveyResult.rows[0];
		const survey = new Survey(
			sData["id"],
			sData["author"],
			sData["title"],
			sData["description"],
			new CategoryVO(sData["category"]),
			new Date(sData["datePosted"]),
			sData["anonymous"],
			sData["published"],
			[]
		);

		const qData: object[] = await this.attachChoiceDataToAllQuestions(
			await this.getQuestionsDataBySurvey(id)
		);

		for (const q of qData)
			survey.addQuestionWithChoices({
				id: q["id"],
				title: q["title"],
				questionType: q["questionType"],
				choicesData: q["choicesData"],
			});

		return survey;
	}

	private async getQuestionsDataBySurvey(id: string): Promise<object[]> {
		const questionsResult = await this._db.query(`
			SELECT id, survey_id as surveyId, title, question_type as questionType
			FROM questions
			WHERE surveyId=$1
			`,
			[id]
		);

		return questionsResult.rows;
	}

	private async getChoicesDataByQuestion(questionId: string): Promise<object[]> {
		const choicesResult = await this._db.query(`
			SELECT SUM(score) AS vote_tally,
				choices.id as id, 
				choices.question_id as questionId, 
				choices.title as title, 
				choices.content as content, 
				choices.content_type as contentType
			FROM votes 
			JOIN choices ON votes.choice_id = choices.id
			WHERE questionId=$1
			GROUP BY choices.id
			`,
			[questionId]
		);

		return choicesResult.rows;
	}

	private async attachChoiceDataToAllQuestions(qData: object[]): Promise<object[]> {
		return await Promise.all(qData.map(async q => {
			q["choicesData"] = (await this.getChoicesDataByQuestion(q["id"]));
			return q;
		}));
	}

	// TODO: Implement
	async getPagedResults(pageSize: number, pageNumber: number): Promise<Survey[]> {
		return [];
	}

	// TODO: Implement
	async remove(id: string): Promise<boolean> {
		return false;
	}

}
