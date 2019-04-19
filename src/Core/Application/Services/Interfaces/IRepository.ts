import { Entity } from "../../../Domain/Model/Entities/Entity.model";

export interface IRepository {
    add(entity: Entity): boolean;
    addRange(entities: Entity): boolean;
    get(id: string): Entity;
    getAll(): Entity[];
    remove(id: string): boolean;
    removeRange(ids: string[]): boolean;
}

