import type { User } from "./user.entity.ts";

export interface UserRepository {
  createUser(user: User): Promise<User>;  
}

export class UserRepositoryImpl implements UserRepository {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.createUser(user);
  }
}