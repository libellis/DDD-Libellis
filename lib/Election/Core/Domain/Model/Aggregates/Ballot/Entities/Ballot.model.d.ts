import { Entity } from "../../../Common/Entities/Entity.model";
import { Question } from "./Question.model";
import { IBallotData } from "../Abstractions/IBallotData";
export declare class Ballot extends Entity {
    voter: string;
    private _questions;
    constructor(id: string, voter: string, _questions: Question[]);
    readonly questions: Question[];
    static create(idGenerator: () => string, sData: IBallotData): Ballot;
    addQuestionWithChoices(questionData: {
        id: string;
        title: string;
        questionType: string;
        choicesData: {
            id: string;
            title: string;
            content: string;
            contentType: string;
            voteTally: number;
        }[];
    }): boolean;
}
