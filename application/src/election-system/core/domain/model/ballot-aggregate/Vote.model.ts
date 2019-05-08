import { Entity } from "../../../../../shared-kernel/entities/Entity.model";
import { ScoreVO } from "../common/value-objects/ScoreVO.model";

export class Vote extends Entity {
	constructor(
		id: string,
		private _questionId: string,
		private _choiceId: string,
		public score: ScoreVO,
	) {
		super(id);
	}

	get questionId() {
		return this._questionId;
	}

	get choiceId() {
		return this._choiceId;
	}
}


