import { env } from 'cloudflare:test';
import * as schema from '@checkpoint/identity/src/database/schema';
import {
	createUser,
	getUserByEmail,
	getUserByUsername,
} from '@checkpoint/identity/src/utils/database/user';
import {
	composeUser,
	setupUser,
} from '@checkpoint/identity/test/setup/fixtures/user.fixture';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { beforeEach, describe, expect, it } from 'vitest';

const database = drizzle(env.D1_IDENTITY, { schema });

describe('getUserByEmail', () => {
	beforeEach(async () => {
		await setupUser(database);
	});

	describe('should return a user when', () => {
		it('a user with the given email exists', async () => {
			const email = 'alexiaputellas@falkara.com';

			const result = await getUserByEmail(database, email);

			expect(result).toEqual({
				id: result?.id,
				createdAt: result?.createdAt,
				modifiedAt: result?.modifiedAt,
				username: 'AlexiaPutellas',
				email,
				password: result?.password,
				salt: result?.salt,
				status: 'UNVERIFIED',
			});
		});
	});

	describe('should return undefined when', () => {
		it('a user with the given email does not exist', async () => {
			const email = 'stinablackstenius@falkara.com';

			const result = await getUserByEmail(database, email);

			expect(result).toBeUndefined();
		});
	});
});

describe('getUserByUsername', () => {
	beforeEach(async () => {
		await setupUser(database);
	});

	describe('should return a user when', () => {
		it('a user with the given username exists', async () => {
			const username = 'AlexiaPutellas';

			const result = await getUserByUsername(database, username);

			expect(result).toEqual({
				id: result?.id,
				createdAt: result?.createdAt,
				modifiedAt: result?.modifiedAt,
				username,
				email: 'alexiaputellas@falkara.com',
				password: result?.password,
				salt: result?.salt,
				status: 'UNVERIFIED',
			});
		});
	});

	describe('should return undefined when', () => {
		it('a user with the given username does not exist', async () => {
			const username = 'StinaBlackstenius';

			const result = await getUserByUsername(database, username);

			expect(result).toBeUndefined();
		});
	});
});

describe('createUser', () => {
	describe('should return and create a user when', () => {
		it('the input is valid', async () => {
			const user = composeUser({});

			const result = await createUser(database, user);

			expect(result).toEqual(user);

			const databaseCheck = await database
				.select()
				.from(schema.user)
				.where(
					and(
						eq(schema.user.username, 'AlexiaPutellas'),
						eq(schema.user.email, 'alexiaputellas@falkara.com'),
					),
				);

			expect(databaseCheck[0]).toEqual(user);
		});
	});
});
