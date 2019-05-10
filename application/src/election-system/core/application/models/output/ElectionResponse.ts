export class ElectionResponse {
    constructor(
        public id: string,
        public startDate: Date,
        public endDate: Date,
        public anonymous: boolean,
        public masterBallotId: string,
        public tellerId: string,
        public restricted?: boolean,
        public permittedVoters?: Set<string>,
    ) {}
}