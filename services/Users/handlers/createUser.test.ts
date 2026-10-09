import type { APIGatewayProxyEvent } from "aws-lambda";
import { describe, expect, it } from "vitest";

import { createUser } from "./createUser.ts";

describe("createUser", () => {
  it("returns a successful response", async () => {
    const user = {
      id: "user-1",
      name: "Jane Doe",
      email: "jane@example.com",
      password: "secret",
    };
    const event = {
      body: JSON.stringify(user),
    } as APIGatewayProxyEvent;
    const response = await createUser(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(user);
  });

  it("rejects invalid JSON", async () => {
    const event = { body: "not-json" } as APIGatewayProxyEvent;
    const response = await createUser(event);

    expect(response.statusCode).toBe(400);
  });
});

