import { Entity } from "./Entity.model";
import { Question } from "./Question.model";
import { CategoryVO } from "../ValueObjects/CategoryVO.model";
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
    static create(idGenerator: () => string, sData: {
        author: string;
        title: string;
        description: string;
        category: string;
        anonymous: boolean;
        published: boolean;
        questionsData: {
            title: string;
            questionType: string;
            choicesData: {
                title: string;
                content: string;
                contentType: string;
                voteTally: number;
            }[];
        }[];
    }): Survey;
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
