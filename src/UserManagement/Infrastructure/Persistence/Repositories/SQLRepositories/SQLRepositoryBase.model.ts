import { IPSQLPool } from "../../Abstractions/IPSQLPool.model";

export abstract class SQLRepositoryBase {
	protected constructor(protected _db: IPSQLPool) {}
}
