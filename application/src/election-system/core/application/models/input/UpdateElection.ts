/**
 * We should be mindful of some rules.  Someone should not be able to change
 * anything about an election during the election period.  If that is necessary
 * then they should delete the election (which will NOT remove the master ballot)
 * and establish a fresh election with the same master ballot.
 */

export interface UpdateElection {
    start?: Date,
    end?: Date,
    anonymous?: boolean,
    masterBallotId?: string,
    permittedVoters?: string[],
    token: string,
}