import { randomUUID } from 'node:crypto';
import * as schema from '@minerva/auth/src/database/schema';
import type { UserInsertType, UserStatus } from '@minerva/auth/src/types/user';
import type { DrizzleD1Database } from 'drizzle-orm/d1';

export const composeUser = ({
	id = randomUUID(),
	createdAt = new Date(),
	modifiedAt = null,
	username = 'AlexiaPutellas',
	email = 'alexiaputellas@falkara.com',
	password = 'TODO',
	salt = 'TODO',
	status = 'UNVERIFIED',
}: {
	id?: string;
	createdAt?: Date;
	modifiedAt?: Date | null;
	username?: string;
	email?: string;
	password?: string;
	salt?: string;
	status?: UserStatus;
}) => {
	return {
		id,
		createdAt,
		modifiedAt,
		username,
		email,
		password,
		salt,
		status,
	};
};

export const setupUser = async (
	db: DrizzleD1Database<typeof schema>,
	values?: Partial<UserInsertType>,
) => {
	const defaultValues: UserInsertType = {
		id: randomUUID(),
		createdAt: new Date(),
		modifiedAt: null,
		username: 'AlexiaPutellas',
		email: 'alexiaputellas@falkara.com',
		password: 'TODO',
		salt: 'TODO',
		status: 'UNVERIFIED',
	};

	await db.insert(schema.user).values({ ...defaultValues, ...values });
};
