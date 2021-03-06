// import { SQLRepositoryBase } from "./SQLRepositoryBase.model";
// import { IPSQLPool } from "../../abstractions/IPSQLPool.model";
// import { Category } from "../../../../core/domain/model/common/value-objects/Category.model";
// import {MasterBallot} from "../../../../core/domain/model/master-ballot-aggregate/MasterBallot.model";
// import {IMasterBallotRepository} from "../../../../core/application/abstractions/IMasterBallotRepository";
//
// export class SQLMasterBallotRepository extends SQLRepositoryBase implements IMasterBallotRepository {
// 	constructor(_db: IPSQLPool){
// 		super(_db);
// 	}
//
// 	// TODO: Implement
// 	async add(entity: MasterBallot): Promise<boolean> {
// 		return false;
// 	}
//
// 	// TODO: Implement
// 	async addRange(entities: MasterBallot[]): Promise<boolean> {
// 		return false;
// 	}
//
// 	// This is a very rough sketch.  Ultimately we shouldn't be piping
// 	// database query results directly into entity constructors.  Look into
// 	// possibly using automapper to map to a consistent object format
// 	// that the constructors expect.
// 	async get(id: string): Promise<MasterBallot> {
// 		const surveyResult = await this._db.query(
// 			`SELECT id,
// 				author,
// 				title,
// 				description,
// 				category,
// 				date_posted as datePosted,
// 				anonymous,
// 		FROM surveys
// 		WHERE id = $1`, [id]);
//
// 		if (surveyResult.rows.length < 1) {
// 			throw new Error('Not Found');
// 		}
//
// 		const sData = surveyResult.rows[0];
// 		const survey = new MasterBallot(
// 			sData["id"],
// 			sData["author"],
// 			sData["title"],
// 			sData["description"],
// 			new Category(sData["category"]),
// 			new Date(sData["datePosted"]),
// 			sData["anonymous"],
// 		);
//
// 		const qData: object[] = await this.attachChoiceDataToAllQuestions(
// 			await this.getQuestionsDataByMasterBallot(id)
// 		);
//
// 		for (const q of qData)
// 			survey.addQuestionWithChoices({
// 				id: q["id"],
// 				title: q["title"],
// 				questionType: q["questionType"],
// 				choicesData: q["choicesData"],
// 			});
//
// 		return survey;
// 	}
//
// 	private async getQuestionsDataByMasterBallot(id: string): Promise<object[]> {
// 		const questionsResult = await this._db.query(`
// 			SELECT id, survey_id as surveyId, title, question_type as questionType
// 			FROM questions
// 			WHERE surveyId=$1
// 			`,
// 			[id]
// 		);
//
// 		return questionsResult.rows;
// 	}
//
// 	private async getChoicesDataByQuestion(questionId: string): Promise<object[]> {
// 		const choicesResult = await this._db.query(`
// 			SELECT SUM(score) AS vote_tally,
// 				choices.id as id,
// 				choices.question_id as questionId,
// 				choices.title as title,
// 				choices.content as content,
// 				choices.content_type as contentType
// 			FROM votes
// 			JOIN choices ON votes.choice_id = choices.id
// 			WHERE questionId=$1
// 			GROUP BY choices.id
// 			`,
// 			[questionId]
// 		);
//
// 		return choicesResult.rows;
// 	}
//
// 	private async attachChoiceDataToAllQuestions(qData: object[]): Promise<object[]> {
// 		return await Promise.all(qData.map(async q => {
// 			q["choicesData"] = (await this.getChoicesDataByQuestion(q["id"]));
// 			return q;
// 		}));
// 	}
//
// 	// TODO: Implement
// 	async getPagedResults(pageSize: number, pageNumber: number): Promise<MasterBallot[]> {
// 		return [];
// 	}
//
// 	// TODO: Implement
// 	async remove(id: string): Promise<boolean> {
// 		return false;
// 	}
//
// 	update(entity: MasterBallot): Promise<boolean> {
// 		return undefined;
// 	}
//
// }
