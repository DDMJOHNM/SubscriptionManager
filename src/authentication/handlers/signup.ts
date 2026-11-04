import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { AuthenticationService } from "../authentication.service.ts";
import { AuthenticationCognito } from "../infrastructure/authentication.cognito.ts";
import type { Authentication } from "../domain/authentication.entity.ts";

export async function signup(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    
    const authentication = JSON.parse(event.body as string) as Authentication;
    const authenticationService = new AuthenticationService(new AuthenticationCognito());
    const authenticationResponse = await authenticationService.signup(authentication);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Authentication successful" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Authentication failed" }),
    };
  }
};