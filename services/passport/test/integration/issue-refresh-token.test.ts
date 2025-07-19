import { env, SELF } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';

describe('issueRefreshToken', () => {
	describe('should return the token when', () => {
		it('the given input is valid', async () => {
			const result = await SELF.issueRefreshToken({
				userId: crypto.randomUUID(),
				audience: 'MINERVA',
				issueDate: new Date(),
			});

			expect(z.parse(z.jwt(), result.token)).toBeTruthy();

			const kvCheck = await env.KV_PASSPORT.get(result.jti);

			expect(kvCheck).toEqual(result.token);
		});
	});
});
