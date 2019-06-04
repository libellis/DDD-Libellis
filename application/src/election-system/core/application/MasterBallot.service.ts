import {MasterBallot} from "../domain/model/master-ballot-aggregate/MasterBallot.model";
import {IMasterBallotRepository} from "./abstractions/IMasterBallotRepository";
import 'automapper-ts';
import {MasterBallotResponse} from "./models/output/MasterBallotResponse";
import {NewMasterBallot} from "./models/input/NewMasterBallot";
import { v4 as uuid } from "uuid";
import {UpdateMasterBallot} from "./models/input/UpdateMasterBallot";
import {PayloadService} from "../../../shared-kernel/services/Payload.service";
import {NotAuthorizedError} from "../../../shared-kernel/exceptions/NotAuthorizedError.model";
import {ResourceNotFoundError} from "../../../shared-kernel/exceptions/ResourceNotFoundError.model";

export class MasterBallotService {
    constructor(
        private masterBallotRepo: IMasterBallotRepository,
    ) {}

    async getMasterBallot(id: string, token: string): Promise<MasterBallotResponse> {
        const masterBallot = await this.masterBallotRepo.get(id);
        const requestingUser = PayloadService.retrieveUsername(token);

        if (masterBallot === undefined) {
            throw new ResourceNotFoundError();
        }

        if (masterBallot.author !== requestingUser) {
            throw new NotAuthorizedError();
        }

        return this.translateMasterBallotToResponse(masterBallot);
    }

    async createMasterBallot(masterBallotData: NewMasterBallot, token: string): Promise<MasterBallotResponse> {
        const author = PayloadService.retrieveUsername(token);
        const masterBallot = this.translateInputToNewMasterBallot(masterBallotData, author);

        if (!(await this.masterBallotRepo.add(masterBallot))) {
            throw new Error("Your new master ballot could not be created.");
        }

        return this.translateMasterBallotToResponse(masterBallot);
    }

    async updateMasterBallot(id: string, masterBallotData: UpdateMasterBallot): Promise<MasterBallotResponse> {
        const masterBallot = await this.masterBallotRepo.get(id);
        const user = PayloadService.retrieveUsername(masterBallotData.token);

        if (masterBallot === undefined) {
            throw new ResourceNotFoundError("Master ballot by that id was not found");
        }

        if (masterBallot.author !== user) {
            throw new NotAuthorizedError();
        }

        masterBallot.updateBallotData(masterBallotData);

        if (!(await this.masterBallotRepo.update(masterBallot))) {
            throw new Error(`Could not update master ballot by id: ${id}`);
        }

        return this.translateMasterBallotToResponse(masterBallot);
    }

    async deleteMasterBallot(id: string, token: string) {
        const user = PayloadService.retrieveUsername(token);
        const masterBallot = await this.masterBallotRepo.get(id);

        if (masterBallot === undefined) {
            throw new ResourceNotFoundError("Master ballot by that id was not found");
        }

        if (masterBallot.author !== user) {
            throw new NotAuthorizedError("You are not authorized to delete that master ballot.");
        }

        if (!(await this.masterBallotRepo.remove(id))) {
            throw new Error("Could not delete master ballot with that id for unknown reasons.");
        }
    }


    // TODO: Replace with automapper once we figure out how to bring in configuration from a single loc
    // Purpose: These serve the purpose of separating our domain layer from our web api layer.  Our web api
    // can know about our application layer, but not about our domain layer.  This also gives us a way to cleanly
    // translate our internal private dunder types (like _id) and get rid of extraneous data from the domain layer.
    private translateMasterBallotToResponse(masterBallot: MasterBallot): MasterBallotResponse {
        return new MasterBallotResponse(
            masterBallot.id,
            masterBallot.title,
            masterBallot.description,
            masterBallot.category.name,
            masterBallot.questions.map(q => {
                return {
                    id: q.id,
                    title: q.title,
                    questionType: q.type,
                    choices: q.choices.map(c => {
                        return {
                            id: c.id,
                            title: c.title,
                            content: c.content,
                            contentType: c.contentType,
                        }
                    })
                }
            })
        );
    }

    // TODO: Replace with automapper once we figure out how to bring in configuration from a single loc
    private translateMasterBallotsToResponse(masterballots: MasterBallot[]): MasterBallotResponse[] {
        return masterballots.map(m => {
            return this.translateMasterBallotToResponse(m);
        })
    }

    // TODO: Replace with automapper once we figure out how to bring in configuration from a single loc
    private translateInputToNewMasterBallot(masterBallotInput: NewMasterBallot, author: string): MasterBallot {
        return MasterBallot.create(uuid, {
            author,
            title: masterBallotInput.title,
            description: masterBallotInput.description,
            category: masterBallotInput.category,
            questionsData: masterBallotInput.questionsData
        })
    }
}