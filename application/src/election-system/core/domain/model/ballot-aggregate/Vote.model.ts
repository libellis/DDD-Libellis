import { Entity } from "../../../../../shared-kernel/Entity.model";
import { Score } from "../common/value-objects/Score.model";

export class Vote extends Entity {
	constructor(
		id: string,
		private _questionId: string,
		private _choiceId: string,
		public score: Score,
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


