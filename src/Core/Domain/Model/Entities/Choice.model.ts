import { Entity } from "./Entity.model";
import { VoteTallyVO } from "../ValueObjects/VoteTallyVO.model";

export class Choice extends Entity {
	constructor(
		id: string,
		private title: string,
		private content: string,
		private contentType: string,
		private voteTally: VoteTallyVO,
	) {
		super(id);
	}
}


