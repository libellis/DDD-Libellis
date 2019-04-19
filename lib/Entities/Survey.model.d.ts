import { Entity } from "./Entity.model";
import { Question } from "./Question.model";
import { CategoryVO } from "../ValueObjects/CategoryVO.model";
import { IIdGenerator } from "./IIdGenerator";
export declare class Survey extends Entity {
    author: string;
    title: string;
    description: string;
    category: CategoryVO;
    datePosted: Date;
    anonymous: boolean;
    published: boolean;
    private questions;
    constructor(id: string, author: string, title: string, description: string, category: CategoryVO, datePosted: Date, anonymous: boolean, published: boolean, questions: Question[]);
    static create(idGenerator: IIdGenerator, sData: {
        author: string;
        title: string;
        description: string;
        category: CategoryVO;
        anonymous: boolean;
        published: boolean;
        questionsData: [{
            title: string;
            questionType: string;
        }];
    }): Survey;
}
