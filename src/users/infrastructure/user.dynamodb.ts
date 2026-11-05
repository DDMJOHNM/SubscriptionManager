//Adapter

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { User } from "../domain/user.entity.ts";
import type { UserRepository } from "../domain/user.repository.ts";

type StoredUser = Omit<User, "createdAt" | "updatedAt" | "deletedAt"> & {
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

function toStoredUser(user: User): StoredUser {
    return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        deletedAt: user.deletedAt?.toISOString() ?? null,
    };
}

function fromStoredUser(item: StoredUser): User {
    return {
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
        deletedAt: item.deletedAt ? new Date(item.deletedAt) : null,
    };
}

export class UserDynamoDBRepository implements UserRepository {
    private readonly documentClient: DynamoDBDocumentClient;

    constructor(dynamoDBClient: DynamoDBClient) {
        this.documentClient = DynamoDBDocumentClient.from(dynamoDBClient);
    }

    async findAll(): Promise<User[]> {
        const result = await this.documentClient.send(new ScanCommand({
            TableName: "subscriptionUsers",
        }));
        return (result.Items ?? []).map((item) => fromStoredUser(item as StoredUser));
    }

    async createUser(user: User): Promise<User> {
        await this.documentClient.send(new PutCommand({
            TableName: "subscriptionUsers",
            Item: toStoredUser(user),
        }));
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const result = await this.documentClient.send(new GetCommand({
            TableName: "subscriptionUsers",
            Key: { id },
        }));
        return result.Item ? fromStoredUser(result.Item as StoredUser) : null;
    }
}
