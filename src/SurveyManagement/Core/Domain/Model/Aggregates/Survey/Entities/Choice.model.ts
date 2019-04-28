import { Entity } from "../../../Common/Entities/Entity.model";
import { VoteTallyVO } from "../../../Common/ValueObjects/VoteTallyVO.model";

export class Choice extends Entity {
	constructor(
		id: string,
		public title: string,
		public content: string,
		public contentType: string,
		public voteTally: VoteTallyVO,
	) {
		super(id);
	}
}


