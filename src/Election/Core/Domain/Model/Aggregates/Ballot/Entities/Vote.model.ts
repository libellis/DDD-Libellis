import { Entity } from "../../../Common/Entities/Entity.model";
import { ScoreVO } from "../ValueObjects/ScoreVO.model";

export class Vote extends Entity {
	constructor(
		id: string,
		public questionId: string,
		public choiceId: string,
		public score: ScoreVO,
	) {
		super(id);
	}
}


