import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import type { Authentication, AuthenticationResponse } from "../domain/authentication.entity.ts";
import type { AuthenticationRepository } from "../domain/authentication.repository.ts";
import { UserDynamoDBRepository } from "../../users/infrastructure/user.dynamodb.ts";
import { UserService } from "../../users/user.service.ts";

export class AuthenticationCognito implements AuthenticationRepository {
  
    private readonly cognitoClient: CognitoIdentityProviderClient;
    private readonly userService: UserService;

    constructor() {
        this.cognitoClient = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION
        });
        this.userService = new UserService(new UserDynamoDBRepository(new DynamoDBClient({})));
     }
    
    async signup(authentication: Authentication): Promise<AuthenticationResponse> {
        try {
            const command = new SignUpCommand({
                ClientId: process.env.COGNITO_CLIENT_ID,
                Username: authentication.email,
                UserAttributes: [
                    {
                        Name: "family_name",
                        Value: authentication.familyName,
                    },
                    {
                        Name: "given_name",
                        Value: authentication.firstName,
                    },
                    {
                        Name: "middle_name",
                        Value: authentication.middleName,
                    },
                    {
                        Name: "email",
                        Value: authentication.email,
                    },
                ],  
                Password: authentication.password,
            });
            await this.cognitoClient.send(command);

            try {

            await this.userService.createUser({
                firstName: authentication.firstName,
                middleName: authentication.middleName,
                familyName: authentication.familyName,
                email: authentication.email,
            });            

            } catch (error) {
                console.error(error);
                return {
                    statusCode: 500,
                    message: (error as Error).message,
                } as AuthenticationResponse;
            }

            return {
                statusCode: 200,
                message: "User created successfully",
            } as AuthenticationResponse;

        } catch (error) {           
            console.error(error);
            return {
                statusCode: 500,
                message: (error as Error).message,
            } as AuthenticationResponse;
        }
    }
}
