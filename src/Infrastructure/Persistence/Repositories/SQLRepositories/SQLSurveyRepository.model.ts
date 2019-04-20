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
		let surveyData = {
					id: sData["id"],
					author: sData["author"],
					title: sData["title"],
					description: sData["description"],
					category: sData["category"],
					datePosted: sData["date_posted"],
					anonymous: sData["anonymous"],
					published: sData["published"],
			};

		const survey = new Survey(
			surveyData.id,
			surveyData.author,
			surveyData.title,
			surveyData.description,
			new CategoryVO(surveyData.category),
			surveyData.datePosted,
			surveyData.anonymous,
			surveyData.published,
			[]
		);

		const questionsResult = await this._db.query(`
            SELECT id, survey_id, title, question_type
            FROM questions
            WHERE survey_id=$1
            `,
			[id]
		);

		let questionsData = [];
		if (questionsResult.rows.length > 0) {
			questionsData = questionsResult.rows.map(qData => {
				return {
					id: qData["id"],
					title: qData["title"],
					questionType: qData["question_type"],
				}
			});
		}

		for (const qData of questionsData) {
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
				[id]
			);

			qData.choicesData = choicesResult.rows.map(cData => {
				return {
					id: cData["id"],
					title: cData["title"],
					content: cData["content"],
					contentType: cData["content_type"],
					voteTally: cData["voteTally"],
				}
			});

			survey.addQuestionWithChoices(qData);
		}

		return survey;
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
