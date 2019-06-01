export interface UpdateUser {
    id: string;
    currentPassword: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    photoUrl?: string;
}