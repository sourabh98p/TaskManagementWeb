export class TokenDetails {
    accessToken!: string;
    refreshToken!: string;
    tokenType!: string;
    tokenExpriationDate!: Date;
    expires_In!: number;
    refreshTokenExpriationDate!: Date;
}

export class UserDetails {
    fullName!: string;
    UserId!: number;
    email!: string;
    role!: string;
    teamid! : number;
}

export class LoginResponse {
    userDetails!: UserDetails;
    tokenDetails! : TokenDetails;
}
export class LoginRequest {
    email!: string;
    password!: string;
}

export class ReportAdminResponse{
    teamName!: string;
    tasksClosed!: number;
    totalTasks!: number;
}