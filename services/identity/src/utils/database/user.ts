import * as schema from '@checkpoint/identity/src/database/schema';
import type { UserInsertType } from '@checkpoint/identity/src/types/user';
import { eq } from 'drizzle-orm';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

export const getUserByEmail = async (
	database: DrizzleD1Database<typeof schema>,
	email: string,
) => {
	const users = await database
		.select()
		.from(schema.user)
		.where(eq(schema.user.email, email));

	return users[0];
};

export const getUserByUsername = async (
	database: DrizzleD1Database<typeof schema>,
	username: string,
) => {
	const users = await database
		.select()
		.from(schema.user)
		.where(eq(schema.user.username, username));

	return users[0];
};

export const createUser = async (
	database: DrizzleD1Database<typeof schema>,
	user: UserInsertType,
) => {
	const users = await database.insert(schema.user).values(user).returning();

	return users[0];
};
