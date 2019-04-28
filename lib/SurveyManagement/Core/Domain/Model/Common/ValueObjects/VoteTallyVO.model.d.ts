export declare class VoteTallyVO {
    private readonly _tally;
    constructor(_tally: number);
    readonly tally: number;
    static isValidTallyNumber(n: number): boolean;
    static isWholeNumber(n: number): boolean;
    static isNonNegative(n: number): boolean;
}
