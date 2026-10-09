import type { User } from "./User.ts";

export class UserRepository {
  private readonly userMap = new Map<string, User>();

  async createUser(user: User): Promise<User> {
    this.userMap.set(user.id, user);
    return user;
  }
}