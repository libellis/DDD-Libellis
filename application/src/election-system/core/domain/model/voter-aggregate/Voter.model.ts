import { Entity } from "../../../../../shared-kernel/entities/Entity.model";

// Within the Election System bounded context we don't need to know
// anymore about the user than these small details to accomplish the task of
// issuing them a ballot, and recording their vote.
// A more full picture of the user can be created and updated via the user-management
// bounded context - which could likely be handled by a 3rd party Oauth based service.
export class Voter extends Entity {
	constructor(
		id: string,
	) {
		super(id);
	}

	static create(
		idGenerator: () => string,
	) : Voter {
		return new Voter(idGenerator());
	}

}
