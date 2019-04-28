export interface IPSQLPool {
	end(): void;
	query(queryString: string, parameters: any[]): Promise<QueryResults>;
}

interface QueryResults {
	rows: object[];
}
