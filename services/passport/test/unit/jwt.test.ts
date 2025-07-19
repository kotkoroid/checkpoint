import {
	composeAudienceClaim,
	createAccessToken,
} from '@checkpoint/passport/src/utils/jwt';
import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';

describe('createAccessToken', () => {
	describe('should return a token and a jti when', () => {
		it('the input is valid', async () => {
			const accessToken = await createAccessToken({
				userId: crypto.randomUUID(),
				audience: 'MINERVA',
				issueDate: new Date(),
			});

			expect(z.parse(z.jwt(), accessToken.token)).toBeTruthy();
			expect(z.parse(z.uuid(), accessToken.jti)).toBeTruthy();
		});
	});
});

describe('composeAccessTokenAudienceClaim', () => {
	describe('should return an array with Checkpoint and product urls', () => {
		it('the input is valid', () => {
			const acessTokenAudienceClaim = composeAudienceClaim('MINERVA');

			expect(z.parse(z.array(z.string()), acessTokenAudienceClaim));
			expect(acessTokenAudienceClaim.at(0)).toEqual(
				'https://checkpoint.falkara.com',
			);
			expect(acessTokenAudienceClaim.at(1)).toEqual(
				'https://api.minerva.falkara.com',
			);
		});
	});
});
