import {IElectionRepository} from "./abstractions/IElectionRepository";
import {ElectionResponse} from "./models/output/ElectionResponse";
import {Election} from "../domain/model/election-aggregate/Election.model";
import {IMasterBallotRepository} from "./abstractions/IMasterBallotRepository";
import uuid from "uuid/v4";
import {NewElection} from "./models/input/NewElection";
import {MasterBallot} from "../domain/model/master-ballot-aggregate/MasterBallot.model";
import {EventBus} from "../../../shared-kernel/event-streams/EventBus";
import {UpdateElection} from "./models/input/UpdateElection";
import {PayloadService} from "../../../shared-kernel/services/Payload.service";
import {ResourceNotFoundError} from "../../../shared-kernel/exceptions/ResourceNotFoundError.model";
import {NotAuthorizedError} from "../../../shared-kernel/exceptions/NotAuthorizedError.model";

export class ElectionService {
    constructor(
        private electionRepo: IElectionRepository,
        private masterBallotRepo: IMasterBallotRepository,
        private eventBus: EventBus,
    ) {}


    // TODO: Make sure paged results are only live elections.
    async getElectionsPagedResults(pageSize: number, pageNum: number): Promise<ElectionResponse[]> {
        const elections = await this.electionRepo.getPagedResults(pageSize, pageNum);
        return ElectionService.translateElectionsToResponse(elections);
    }

    async getElection(id: string, token: string): Promise<ElectionResponse> {
        const election = await this.electionRepo.get(id);
        const requestingUser = PayloadService.retrieveUsername(token);

        if (election === undefined) {
            throw new ResourceNotFoundError("Election by that id was not found")
        }

        if (!election.isActive || election.creator !== requestingUser) {
            throw new NotAuthorizedError("You are not authorized to view that election.");
        }

        return ElectionService.translateElectionToResponse(election);
    }

    async createElection(newElectionData: NewElection, token: string): Promise<ElectionResponse> {
        const masterBallot = await this.masterBallotRepo.get(newElectionData.masterBallotId);
        const creator = PayloadService.retrieveUsername(token);

        if (masterBallot === undefined) {
            throw new ResourceNotFoundError("Did not find a master ballot by that id");
        }

        if (masterBallot.author !== creator) {
            throw new NotAuthorizedError("You are not the user who created that master ballot.");
        }

        const election = this.createElectionEntity(newElectionData, masterBallot);

        if (!(await this.electionRepo.add(election))) {
            throw new Error(`Failed to persist election.`);
        }

        return ElectionService.translateElectionToResponse(election);
    }

    async updateElection(id: string, electionUpdateData: UpdateElection): Promise<ElectionResponse> {
        const election = await this.electionRepo.get(id);
        const username = PayloadService.retrieveUsername(electionUpdateData.token);

        if (election === undefined) {
            throw new ResourceNotFoundError(`Could not find an election by id: ${id}`);
        }

        if (election.creator !== username) {
            throw new NotAuthorizedError("You are not the user who created the election.");
        }

        if (election.isActive) {
            throw new NotAuthorizedError(`You cannot change election details once an election has started.`);
        }

        election.updateElectionData(electionUpdateData);

        if (!(await this.electionRepo.update(election))) {
            throw new Error(`Failed to update election by id: ${id}`);
        }

        return ElectionService.translateElectionToResponse(election);
    }

    async removeElection(id: string, token: string) {
        const election = await this.electionRepo.get(id);
        const username = PayloadService.retrieveUsername(token);

        if (election === undefined) {
            throw new ResourceNotFoundError(`Could not find an election by id: ${id}`);
        }

        if (election.creator !== username) {
            throw new NotAuthorizedError("You are not the user who created the election.");
        }

        if (!(await this.electionRepo.remove(id))) {
            throw new Error(`Failed to remove election by id: ${id}`);
        }
    }

    async retrieveElectionResults(id: string) {
        const election = await this.electionRepo.get(id);

        return election.getElectionResults();
    }

    // TODO: Replace with automapper once we figure out how to bring in configuration from a single loc
    // Purpose: These serve the purpose of separating our domain layer from our web api layer.  Our web api
    // can know about our application layer, but not about our domain layer.  This also gives us a way to cleanly
    // translate our internal private dunder types (like _id) and get rid of extraneous data from the domain layer.
    private static translateElectionToResponse(election: Election): ElectionResponse {
        const electionResponse = new ElectionResponse(
            election.id,
            election.startDate,
            election.endDate,
            election.anonymous,
            election.masterBallotId,
            election.tellerId,
        );

        if (election.restricted) {
            electionResponse.restricted = true;
            electionResponse.permittedVoters = election.permittedVoters;
        }

        return electionResponse;
    }

    private static translateElectionsToResponse(elections: Election[]): ElectionResponse[] {
        return elections.map(e => {
            return ElectionService.translateElectionToResponse(e);
        })
    }

    private createElectionEntity(electionData: NewElection, masterBallot: MasterBallot): Election {
        const permittedVoters = electionData.permittedVoters !== undefined ? new Set(electionData.permittedVoters) : undefined;
        return Election.create(
            uuid,
            electionData.start,
            electionData.end,
            electionData.anonymous,
            masterBallot,
            this.eventBus,
            permittedVoters,
            );
    }
}