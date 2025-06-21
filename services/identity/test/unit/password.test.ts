import { generatePassword } from '@checkpoint/identity/src/utils/password';
import { describe, expect, it } from 'vitest';

describe('generatePassword', () => {
	describe('should return a key and a salt when', () => {
		it('the input is valid', async () => {
			const result = generatePassword({
				password: 'Z!%pfwBvCM^M&m*SS*r%aX0W',
				salt: '59a10bd007dc91bb574d2af35ba9010a47377c794d0fccdcf899eb4ba4c972c9',
			});

			expect(result).toEqual({
				key: '2dfbd1ed80ee2dacd480837b94dd929575c5c40846f2663df25a6a31b0a6e2e841f93549b7a11ff32ddeabdc50b806a3d0dd79ae4e4214e1c9e89a17fb67d18c',
				salt: '59a10bd007dc91bb574d2af35ba9010a47377c794d0fccdcf899eb4ba4c972c9',
			});
		});

		it('the input is not provided', async () => {
			const result = generatePassword();

			expect(result.key.length).toEqual(128);
			expect(result.salt.length).toEqual(64);
		});
	});
});
