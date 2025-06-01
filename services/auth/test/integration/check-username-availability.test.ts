import { env, SELF } from 'cloudflare:test';
import * as schema from '@minerva/auth/src/database/schema';
import { setupUser } from '@minerva/auth/test/setup/fixtures/user';
import { drizzle } from 'drizzle-orm/d1';
import { beforeEach, describe, expect, it } from 'vitest';

describe('checkUsernameAvailability', () => {
	const database = drizzle(env.DB_AUTH, { schema });

	beforeEach(async () => {
		await setupUser(database);
	});

	describe('should return true when', () => {
		it('the given username is available', async () => {
			const username = 'MapiLeon';

			const result = await SELF.checkUsernameAvailability({
				username,
			});

			expect(result).toBeTruthy();
		});
	});

	describe('should return false when', () => {
		it('the given username is taken', async () => {
			const result = await SELF.checkUsernameAvailability({
				username: 'AlexiaPutellas',
			});

			expect(result).toBeFalsy();
		});
	});
});
