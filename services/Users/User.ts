export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  //User instance doesnt when this function is called
  static validate(user: Partial<User>): user is User {
    return (
      typeof user.id === "string" &&
      typeof user.name === "string" &&
      typeof user.email === "string" &&
      typeof user.password === "string"
    );
  }
}