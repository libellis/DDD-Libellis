import { Entity } from "./Entities/Entity.model";
export interface IRepository {
    add(entity: Entity): boolean;
    addRange(entities: Entity): boolean;
    get(key: string): Entity;
    getAll(): Entity[];
    remove(key: string): boolean;
    removeRange(keys: string[]): boolean;
}
