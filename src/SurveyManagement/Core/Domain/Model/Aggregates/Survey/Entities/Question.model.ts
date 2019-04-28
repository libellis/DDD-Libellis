import { Entity } from "../../../Common/Entities/Entity.model";
import { Choice } from "./Choice.model";

export class Question extends Entity {
	constructor(
		id: string,
		public title: string,
		public type: string,
		public choices: Choice[],
	) {
		super(id);
	}
}
