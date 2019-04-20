export interface IPSQLPool {
	end(): void;
	query(queryString: string, parameters: any[]): Promise<{rows: object[]}>;
}
