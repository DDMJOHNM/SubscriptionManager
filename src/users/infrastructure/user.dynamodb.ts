//Adapter

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { User } from "../domain/user.entity.ts";
import type { UserRepository } from "../domain/user.repository.ts";

export class UserDynamoDBRepository implements UserRepository {
    private readonly documentClient: DynamoDBDocumentClient;

    constructor(dynamoDBClient: DynamoDBClient) {
        this.documentClient = DynamoDBDocumentClient.from(dynamoDBClient);
    }

    async findAll(): Promise<User[]> {
        const result = await this.documentClient.send(new ScanCommand({
            TableName: "users",
        }));
        return (result.Items ?? []) as User[];
    }

    async createUser(user: User): Promise<User> {
        await this.documentClient.send(new PutCommand({
            TableName: "users",
            Item: user,
        }));
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const result = await this.documentClient.send(new GetCommand({
            TableName: "users",
            Key: { id },
        }));
        return (result.Item as User | undefined) ?? null;
    }
}
