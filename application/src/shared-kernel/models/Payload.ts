export interface Payload {
    userId: string;
    username: string;
    status: MemberStatus;
}

export enum MemberStatus {
    Admin,
    User,
    Voter,
}
