import type { User } from "../domain/user.entity.ts";
import type { UserRepository } from "../domain/user.repository.ts";

export class InvalidUserDataError extends Error {
  constructor() {
    super("Invalid user data.");
    this.name = "InvalidUserDataError";
  }
}

export class CreateUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: { name?: string; email?: string; password?: string }): Promise<User> {
    if (!input.name || !input.email || !input.password) {
      throw new InvalidUserDataError();
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: input.name,
      email: input.email,
      password: input.password,
    };

    return this.userRepository.createUser(newUser);
  }
}
