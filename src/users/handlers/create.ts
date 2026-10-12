import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import type { User } from "../domain/user.entity.ts";
import type { UserRepository } from "../domain/user.repository.ts";
import { CreateUserUseCase, InvalidUserDataError } from "../use-cases/create-user.ts";

const users = new Map<string, User>();

const userRepository: UserRepository = {
  async createUser(user: User): Promise<User> {
    users.set(user.id, user);
    return user;
  },
};

const createUser = new CreateUserUseCase(userRepository);

export async function handler(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  try {
    const body = JSON.parse(event.body ?? "{}") as Partial<User>;
    const createdUser = await createUser.execute(body);

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
