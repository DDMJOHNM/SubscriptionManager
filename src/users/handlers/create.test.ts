import { describe, expect, it, vi } from "vitest";

import { UserService } from "../user.service.ts";
import type { UserRepository } from "../domain/user.repository.ts";

describe("createUser", () => {
  it("returns a successful response", async () => {
    const createUser = vi.fn(async (user) => user);
    const repository: UserRepository = { createUser };
    const userService = new UserService(repository);

    const response = await userService.createUser({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "secret",
    });

    expect(response).toEqual({
      id: expect.any(String),
      name: "Jane Doe",
      email: "jane@example.com",
      password: "secret",
    });
    expect(createUser).toHaveBeenCalledWith(response);
  });

  it("rejects a user missing required fields", async () => {
    const repository: UserRepository = { createUser: vi.fn() };
    const userService = new UserService(repository);

    await expect(userService.createUser({ name: "Jane Doe", email: "jane@example.com" })).rejects.toThrow(
      "Invalid user data.",
    );
  });
});
