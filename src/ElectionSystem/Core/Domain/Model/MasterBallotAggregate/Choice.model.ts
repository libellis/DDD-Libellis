import { Entity } from "../Common/Entities/Entity.model";

export class Choice extends Entity {
	constructor(
		id: string,
		public title: string,
		public content: string,
		public contentType: string,
	) {
		super(id);
	}
}


