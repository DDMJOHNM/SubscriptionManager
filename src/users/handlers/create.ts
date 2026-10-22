import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import type { User } from "../domain/user.entity.ts";
import { UserDynamoDBRepository } from "../infrastructure/user.dynamodb.ts";
import { InvalidUserDataError, UserService } from "../user.service.ts";

const userRepository = new UserDynamoDBRepository(new DynamoDBClient({}));
const userService = new UserService(userRepository);

export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    const body = JSON.parse(event.body ?? "{}") as Partial<User>;
    const { name, email, password } = body;
    if (!name || !email || !password) {
      throw new InvalidUserDataError();
    }

    const createdUser = await userService.createUser({
      name,
      email,
      password,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(createdUser),
    };
  } catch (error) {
    if (error instanceof InvalidUserDataError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message }),
      };
    }

    if (error instanceof SyntaxError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Request body must be valid JSON." }),
      };
    }

    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not create user." }),
    };
  }
}
