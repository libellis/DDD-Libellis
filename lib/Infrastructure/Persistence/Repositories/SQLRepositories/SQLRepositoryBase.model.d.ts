import { IPSQLPool } from "../../Abstractions/IPSQLPool.model";
export declare abstract class SQLRepositoryBase {
    protected _db: IPSQLPool;
    protected constructor(_db: IPSQLPool);
}
