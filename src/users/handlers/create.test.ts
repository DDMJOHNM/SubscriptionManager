import { describe, expect, it, vi } from "vitest";

import { UserService } from "../user.service.ts";
import type { UserRepository } from "../domain/user.repository.ts";
import type { User } from "../domain/user.entity.ts";

describe("createUser", () => {
  it("returns a successful response", async () => {
    const createUser = vi.fn(async (user) => user);
    const repository: UserRepository = { createUser };
    const userService = new UserService(repository);

    const response = await userService.createUser({
      firstName: "Jane",
      middleName: "Doe",
      familyName: "Doe",
      email: "jane@example.com",
    });

    expect(response).toEqual({
      id: expect.any(String),
      firstName: "Jane",
      middleName: "Doe",
      familyName: "Doe",
      email: "jane@example.com",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null,
      isActive: true,
      isDeleted: false,
    });
    expect(createUser).toHaveBeenCalledWith(response);
  });

  it("rejects a user missing required fields", async () => {
    const repository: UserRepository = { createUser: vi.fn() };
    const userService = new UserService(repository);

    await expect(
      userService.createUser({ firstName: "", middleName: "", familyName: "", email: "jane@example.com" }),
    ).rejects.toThrow("Invalid user data.");
  });
});
