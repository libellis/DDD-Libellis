import { Entity } from "../../../../../SharedKernel/Entities/Entity.model";

export interface IRepository {
    add(entity: Entity): Promise<boolean>;
    addRange(entities: Entity[]): Promise<boolean>;
    get(id: string): Promise<Entity>;
    getPagedResults(pageSize: number, pageNumber: number): Promise<Entity[]>;
    remove(id: string): Promise<boolean>;
}
