import { IPSQLPool } from "../../Abstractions/IPSQLPool.model";

export abstract class SQLRepositoryBase {
	protected constructor(private _db: IPSQLPool) {}
}
