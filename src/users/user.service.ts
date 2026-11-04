import type { User } from "./domain/user.entity.ts";
import type { UserRepository } from "./domain/user.repository.ts";

export class InvalidUserDataError extends Error {
  constructor() {
    super("Invalid user data.");
    this.name = "InvalidUserDataError";
  }
}

//TODO: Add check to see if user is in the database already

export class UserService implements UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(input: { firstName: string; middleName: string; familyName: string; email: string }): Promise<User> {
    if (!input.firstName || !input.middleName || !input.familyName || !input.email) {
      throw new InvalidUserDataError();
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      firstName: input.firstName,
      middleName: input.middleName,
      familyName: input.familyName,
      email: input.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      isActive: true,
      isDeleted: false,
    };

    return this.userRepository.createUser(newUser);
  }
}
