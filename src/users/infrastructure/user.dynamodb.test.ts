import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { afterEach, describe, expect, it, vi } from "vitest";
import { UserDynamoDBRepository } from "./user.dynamodb.ts";

describe("UserDynamoDBRepository", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("stores dates as ISO strings DynamoDB can marshall", async () => {
    const send = vi.spyOn(DynamoDBDocumentClient.prototype, "send").mockResolvedValue({} as never);
    const repository = new UserDynamoDBRepository(new DynamoDBClient({}));

    await repository.createUser({
      id: "user-1",
      firstName: "Jane",
      middleName: "Doe",
      familyName: "Doe",
      email: "jane@example.com",
      createdAt: new Date("2026-11-05T00:05:23.000Z"),
      updatedAt: new Date("2026-11-05T00:05:23.000Z"),
      deletedAt: null,
      isActive: true,
      isDeleted: false,
    });

    const command = send.mock.calls[0][0] as PutCommand;
    expect(command.input.Item).toMatchObject({
      createdAt: "2026-11-05T00:05:23.000Z",
      updatedAt: "2026-11-05T00:05:23.000Z",
      deletedAt: null,
    });
    expect(() => marshall(command.input.Item!)).not.toThrow();
  });
});
