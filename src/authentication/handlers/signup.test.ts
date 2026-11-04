import { describe, expect, it, vi } from "vitest";
import { AuthenticationService } from "../authentication.service.ts";
import type { AuthenticationRepository } from "../domain/authentication.repository.ts";

describe("signup", () => {
  it("returns the repository response", async () => {
    const authentication = {
      firstName: "John",
      familyName: "Doe",
      middleName: "Doe",
      email: "john.doe@example.com",
      password: "password",
    };
    const signup = vi.fn(async () => ({
      statusCode: 200,
      message: "User created successfully",
    }));
    const repository: AuthenticationRepository = { signup };
    const authenticationService = new AuthenticationService(repository);

    const authenticationResponse = await authenticationService.signup(authentication);

    expect(authenticationResponse).toEqual({
      statusCode: 200,
      message: "User created successfully",
    });
    expect(signup).toHaveBeenCalledWith(authentication);
  });
});
