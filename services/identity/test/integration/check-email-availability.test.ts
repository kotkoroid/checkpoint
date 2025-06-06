import { env, SELF } from 'cloudflare:test';
import * as schema from '@checkpoint/identity/src/database/schema';
import { setupUser } from '@checkpoint/identity/test/setup/fixtures/user';
import { drizzle } from 'drizzle-orm/d1';
import { beforeEach, describe, expect, it } from 'vitest';

describe('checkEmailAvailability', () => {
	const database = drizzle(env.DATABASE_IDENTITY, { schema });

	beforeEach(async () => {
		await setupUser(database);
	});

	describe('should return true when', () => {
		it('the given email is available', async () => {
			const email = 'mapileon@falkara.com';

			const result = await SELF.checkEmailAvailability({
				email,
			});

			expect(result).toBeTruthy();
		});
	});

	describe('should return false when', () => {
		it('the given email is taken', async () => {
			const result = await SELF.checkEmailAvailability({
				email: 'alexiaputellas@falkara.com',
			});

			expect(result).toBeFalsy();
		});
	});
});
