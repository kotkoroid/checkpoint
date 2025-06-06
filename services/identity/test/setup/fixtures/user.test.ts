import { env } from 'cloudflare:test';
import * as schema from '@checkpoint/identity/src/database/schema';
import {
	composeUser,
	setupUser,
} from '@checkpoint/identity/test/setup/fixtures/user';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { describe, expect, it } from 'vitest';

describe('fixtures/user', () => {
	describe('composeUser', () => {
		describe('should return a user when', () => {
			it('the input is left for default values', async () => {
				const result = composeUser({});

				expect(result).toMatchObject({
					id: result?.id,
					createdAt: result?.createdAt,
					modifiedAt: result?.modifiedAt,
					username: 'AlexiaPutellas',
					email: 'alexiaputellas@falkara.com',
					password: result?.password,
					salt: result?.salt,
					status: 'UNVERIFIED',
				});
			});

			it('a custom values are provided for the input', async () => {
				const username = 'FridolinaRolfo';
				const email = 'fridolinarolfo@falkara.com';

				const result = composeUser({ username, email });

				expect(result).toMatchObject({
					id: result?.id,
					createdAt: result?.createdAt,
					modifiedAt: result?.modifiedAt,
					username,
					email,
					password: result?.password,
					salt: result?.salt,
					status: 'UNVERIFIED',
				});
			});
		});
	});

	describe('setupUser', () => {
		const database = drizzle(env.DATABASE_IDENTITY, { schema });

		describe('should create a user when', () => {
			it('the input is left for default values', async () => {
				await setupUser(database);

				const databaseCheck = await database
					.select()
					.from(schema.user)
					.where(
						and(
							eq(schema.user.username, 'AlexiaPutellas'),
							eq(schema.user.email, 'alexiaputellas@falkara.com'),
						),
					);

				expect(databaseCheck[0]).toMatchObject({
					id: databaseCheck[0]?.id,
					createdAt: databaseCheck[0]?.createdAt,
					modifiedAt: databaseCheck[0]?.modifiedAt,
					username: 'AlexiaPutellas',
					email: 'alexiaputellas@falkara.com',
					password: databaseCheck[0]?.password,
					salt: databaseCheck[0]?.salt,
					status: 'UNVERIFIED',
				});
			});

			it('a custom values are provided for the input', async () => {
				const username = 'FridolinaRolfo';
				const email = 'fridolinarolfo@falkara.com';

				await setupUser(database, { username, email });

				const databaseCheck = await database
					.select()
					.from(schema.user)
					.where(
						and(
							eq(schema.user.username, username),
							eq(schema.user.email, email),
						),
					);

				expect(databaseCheck[0]).toMatchObject({
					id: databaseCheck[0]?.id,
					createdAt: databaseCheck[0]?.createdAt,
					modifiedAt: databaseCheck[0]?.modifiedAt,
					username,
					email,
					password: databaseCheck[0]?.password,
					salt: databaseCheck[0]?.salt,
					status: 'UNVERIFIED',
				});
			});
		});
	});
});
