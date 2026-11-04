export interface Authentication {
    firstName: string;
    familyName: string;
    middleName: string;
    email: string;
    password: string;
}

export interface AuthenticationResponse {
    statusCode: number;
    message: string;
}