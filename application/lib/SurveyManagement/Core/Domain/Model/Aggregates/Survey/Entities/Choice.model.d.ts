import { Entity } from "../../../Common/Entities/Entity.model";
import { VoteTallyVO } from "../../../Common/ValueObjects/VoteTallyVO.model";
export declare class Choice extends Entity {
    title: string;
    content: string;
    contentType: string;
    voteTally: VoteTallyVO;
    constructor(id: string, title: string, content: string, contentType: string, voteTally: VoteTallyVO);
}
