import { Entity } from "../../../Domain/Model/Entities/Entity.model";

export interface IRepository {
    add(entity: Entity): Promise<boolean>;
    addRange(entities: Entity): Promise<boolean>;
    get(id: string): Promise<Entity>;
    getAll(): Promise<Entity[]>;
    remove(id: string): Promise<boolean>;
    removeRange(ids: string[]): Promise<boolean>;
}

