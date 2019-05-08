import { IPSQLPool } from "../../abstractions/IPSQLPool.model";

export abstract class SQLRepositoryBase {
	protected constructor(protected _db: IPSQLPool) {}
}
