import { Entity } from "../../../Common/Entities/Entity.model";
import { Question } from "./Question.model";
import { CategoryVO } from "../../../Common/ValueObjects/CategoryVO.model";
import { ISurveyData } from "../Abstractions/ISurveyData";
export declare class Survey extends Entity {
    author: string;
    title: string;
    description: string;
    category: CategoryVO;
    datePosted: Date;
    anonymous: boolean;
    published: boolean;
    private _questions;
    constructor(id: string, author: string, title: string, description: string, category: CategoryVO, datePosted: Date, anonymous: boolean, published: boolean, _questions: Question[]);
    readonly questions: Question[];
    static create(idGenerator: () => string, sData: ISurveyData): Survey;
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
