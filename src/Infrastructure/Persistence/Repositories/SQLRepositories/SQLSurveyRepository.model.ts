import { SQLRepositoryBase } from "./SQLRepositoryBase.model";
import { IRepository } from "../../../../Core/Application/Services/Interfaces/IRepository";
import { IPSQLPool } from "../../Abstractions/IPSQLPool.model";
import { Survey } from "../../../../Core/Domain/Model/Entities/Survey.model";
import { CategoryVO } from "../../../../Core/Domain/Model/ValueObjects/CategoryVO.model";

export class SQLSurveyRepository extends SQLRepositoryBase implements IRepository {

	constructor(_db: IPSQLPool){
		super(_db);
	}

	// TODO: Implement
	async add(entity: Survey): Promise<boolean> {
		return false;
	}

	// TODO: Implement
	async addRange(entities: Survey): Promise<boolean> {
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
				date_posted,
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
			sData["date_posted"],
			sData["anonymous"],
			sData["published"],
			[]
		);

		const questionsResult = await this._db.query(`
            SELECT id, survey_id, title, question_type as questionType
            FROM questions
            WHERE survey_id=$1
            `,
			[id]
		);

		const qData = questionsResult.rows[0];

		const choicesResult = await this._db.query(`
			SELECT SUM(score) AS vote_tally,
				choices.id as id, 
				choices.question_id as question_id, 
				choices.title as title, 
				choices.content as content, 
				choices.content_type as content_type
			FROM votes 
			JOIN choices ON votes.choice_id = choices.id
			WHERE question_id=$1
			GROUP BY choices.id
			`,
			[qData["id"]]
		);

		const newQuestionData = {
			id: qData["id"] as string,
			title: qData["title"] as string,
			questionType: qData["question_type"] as string,
			choicesData: choicesResult.rows.map(cData => {
				return {
					id: cData["id"],
					title: cData["title"],
					content: cData["content"],
					contentType: cData["content_type"],
					voteTally: cData["voteTally"],
				}
			}),
		};

		survey.addQuestionWithChoices(newQuestionData);

		return survey;
	}

	private getQuestionsDataBySurvey(id: string) {

	}

	// TODO: Implement
	async getAll(): Promise<Survey[]> {
		return [];
	}

	// TODO: Implement
	async remove(id: string): Promise<boolean> {
		return false;
	}

}
