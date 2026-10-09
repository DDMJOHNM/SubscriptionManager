import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { User } from "../User.ts";
import { UserRepository } from "../UserRepository.ts";

const userRepository = new UserRepository();

export const createUser = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const user = JSON.parse(event.body ?? "{}") as Partial<User>;

    if (!User.validate(user)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid user data." }),
      };
    }

    const createdUser = await userRepository.createUser(user);

    return {
      statusCode: 200,
      body: JSON.stringify(createdUser),
    };
  } catch (error) {
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
};
