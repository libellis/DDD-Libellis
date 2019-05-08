import { Entity } from "../../../../shared-kernel/entities/Entity.model";

export interface IRepository {
    add(entity: Entity): Promise<boolean>;
    addRange(entities: Entity[]): Promise<boolean>;
    get(id: string): Promise<Entity>;
    getPagedResults(pageSize: number, pageNumber: number): Promise<Entity[]>;
    update(entity: Entity): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
