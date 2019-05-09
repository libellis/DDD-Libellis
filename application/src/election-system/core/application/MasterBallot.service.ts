import {MasterBallot} from "../domain/model/master-ballot-aggregate/MasterBallot.model";
import {IMasterBallotRepository} from "./abstractions/IMasterBallotRepository";
import 'automapper-ts';
import {MasterBallotResponse} from "./models/output/MasterBallotResponse";
import {NewMasterBallot} from "./models/input/NewMasterBallot";
import { v4 as uuid } from "uuid";
import {UpdateMasterBallot} from "./models/input/UpdateMasterBallot";

export class MasterBallotService {
    constructor(private masterBallotRepo: IMasterBallotRepository) {}

    async getMasterBallotsPagedResults(pageSize: number, pageNum: number): Promise<MasterBallotResponse[]> {
        const masterBallots = await this.masterBallotRepo.getPagedResults(pageSize, pageNum);
        return this.translateMasterBallotsToResponse(masterBallots);
    }

    async getMasterBallot(id: string): Promise<MasterBallotResponse> {
        const masterBallot = await this.masterBallotRepo.get(id);

        if (masterBallot === undefined) {
            throw new Error("Master ballot by that id was not found");
        }

        return this.translateMasterBallotToResponse(masterBallot);
    }

    async createMasterBallot(masterBallotData: NewMasterBallot, author: string): Promise<MasterBallotResponse> {
        const masterBallot = this.translateInputToNewMasterBallot(masterBallotData, author);

        if (!(await this.masterBallotRepo.add(masterBallot))) {
            throw new Error("Your new master ballot could not be created.");
        }

        return this.translateMasterBallotToResponse(masterBallot);
    }

    async updateMasterBallot(id: string, masterBallotData: UpdateMasterBallot): Promise<MasterBallotResponse> {
        const masterBallot = await this.masterBallotRepo.get(id);

        if (masterBallot === undefined) {
            throw new Error("Master ballot by that id was not found");
        }

        masterBallot.updateBallotData(masterBallotData);

        if (!(await this.masterBallotRepo.update(masterBallot))) {
            throw new Error(`Could not update master ballot by id: ${id}`);
        }

        return this.translateMasterBallotToResponse(masterBallot);
    }

    async deleteMasterBallot(id: string, user: string): Promise<boolean> {
        const masterBallot = await this.masterBallotRepo.get(id);

        if (masterBallot === undefined) {
            throw new Error("Master ballot by that id was not found");
        }

        if (masterBallot.author !== user) {
            throw new Error("You are not authorized to delete that master ballot.");
        }

        return await this.masterBallotRepo.remove(id);
    }


    // TODO: Replace with automapper once we figure out how to bring in configuration from a single loc
    // Purpose: These serve the purpose of separating our domain layer from our web api layer.  Our web api
    // can know about our application layer, but not about our domain layer.  This also gives us a way to cleanly
    // translate our internal private dunder types (like _id) and get rid of extraneous data from the domain layer.
    private translateMasterBallotToResponse(masterBallot: MasterBallot): MasterBallotResponse {
        return new MasterBallotResponse(
            masterBallot.title,
            masterBallot.description,
            masterBallot.category.name,
            masterBallot.questions.map(q => {
                return {
                    title: q.title,
                    questionType: q.type,
                    choices: q.choices.map(c => {
                        return {
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