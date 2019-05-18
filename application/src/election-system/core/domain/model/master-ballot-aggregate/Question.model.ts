import { Choice } from "./Choice.model";
import { Entity } from "../../../../../shared-kernel/Entity.model";

export class Question extends Entity {
	constructor(
		id: string,
		public title: string,
		public type: string,
		public choices: Choice[],
	) {
		super(id);
	}

	get choiceCount() {
		return this.choices.length
	}
}
