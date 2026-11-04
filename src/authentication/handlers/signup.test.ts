import { describe, expect, it, vi } from "vitest";
import { AuthenticationService } from "../authentication.service";
import { AuthenticationCognito } from "../infrastructure/authentication.cognito";

describe("signup", () => {
  it("returns a successful response", async () => {
    const signup = vi.fn(async (authentication) => authentication);
    const authenticationService = new AuthenticationService(new AuthenticationCognito());
    
    const authenticationResponse = await authenticationService.signup({
      firstName: "John",
      familyName: "Doe",
      middleName: "Doe",
      email: "john.doe@example.com",
      password: "password",
    });
    
    expect(authenticationResponse).toEqual({
      statusCode: 200,
      message: "User created successfully",
    });
  });
});