export declare abstract class Entity {
    private readonly _id;
    private _version;
    private _discarded;
    protected constructor(_id: string);
    readonly version: number;
    readonly discarded: boolean;
    readonly id: string;
    equals(other: Entity): boolean;
    incrementVersion(): void;
}
