export interface NewElection {
    start: Date,
    end: Date,
    anonymous: boolean,
    masterBallotId: string,
    permittedVoters?: string[],
    token: string,
}