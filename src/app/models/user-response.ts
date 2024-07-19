export interface TokenDetails {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    tokenExpriationDate: Date;
    expires_In: number;
    refreshTokenExpriationDate: Date;
}

export interface UserDetails {
    firstName: string;
    lastName: string;
    UserId: number;
    email: string;
    role : string;
}

export interface LoginResponse {
    userDetails : UserDetails,
    tokenDetails : TokenDetails
}
export interface LoginRequest {
    email :  string;
    password : string;
}