import type { Authentication, AuthenticationResponse } from "./domain/authentication.entity.ts";
import type { AuthenticationRepository } from "./domain/authentication.repository.ts";

export class AuthenticationService {
    private readonly authenticationRepository: AuthenticationRepository;

    constructor(authenticationRepository: AuthenticationRepository) {
        this.authenticationRepository = authenticationRepository;
    }

    async signup(authentication: Authentication): Promise<AuthenticationResponse> {
        return this.authenticationRepository.signup(authentication);
    }
}   