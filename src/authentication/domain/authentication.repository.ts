import type { Authentication, AuthenticationResponse } from "./authentication.entity.ts";

export interface AuthenticationRepository {
  signup(authentication: Authentication): Promise<AuthenticationResponse>;
}   