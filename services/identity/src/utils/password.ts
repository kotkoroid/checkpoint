import { randomBytes, scryptSync } from 'node:crypto';

export const generatePassword = ({
	password,
	salt,
}: {
	password?: string;
	salt?: string;
} = {}): {
	key: string;
	salt: string;
} => {
	if (!password) {
		password = randomBytes(32).toString('hex');
	}

	if (!salt) {
		salt = randomBytes(32).toString('hex');
	}

	const key = scryptSync(password, salt, 64);

	return { key: key.toString('hex'), salt };
};
