import { WorkerEntrypoint } from 'cloudflare:workers';
import type * as schema from '@checkpoint/identity/src/database/schema';
import type { UserSelectType } from '@checkpoint/identity/src/types/user';
import {
	createUser,
	getUserByEmail,
	getUserByUsername,
} from '@checkpoint/identity/src/utils/database/user';
import { generatePassword } from '@checkpoint/identity/src/utils/password';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';

export default class extends WorkerEntrypoint<IdentityEnv> {
	readonly database: DrizzleD1Database<typeof schema>;

	constructor(ctx: ExecutionContext, env: IdentityEnv) {
		super(ctx, env);

		this.database = drizzle(env.D1_IDENTITY);
	}

	async fetch() {
		return new Response('Identity service is up and running. kthxbye');
	}

	async checkEmailAvailability({ email }: { email: string }): Promise<boolean> {
		const user = await getUserByEmail(this.database, email);

		return !user;
	}

	async checkUsernameAvailability({
		username,
	}: {
		username: string;
	}): Promise<boolean> {
		const user = await getUserByUsername(this.database, username);

		return !user;
	}

	async createUser({
		username,
		email,
		password,
	}: {
		username: string;
		email: string;
		password: string;
	}): Promise<UserSelectType | undefined> {
		const passwordHex = generatePassword({ password });

		const user = await createUser(this.database, {
			id: crypto.randomUUID(),
			createdAt: new Date(),
			username,
			email,
			password: passwordHex.key,
			salt: passwordHex.salt,
			status: 'UNVERIFIED',
		});

		return user;
	}

	async verifyUser({
		username,
		email,
		password,
	}: {
		username: string;
		email: string;
		password: string;
	}): Promise<UserSelectType | undefined> {
		const user = username
			? await getUserByUsername(this.database, username)
			: await getUserByEmail(this.database, email);

		if (!user) {
			throw new Error('The user does not exist.');
		}

		const passwordVerified = generatePassword({ password, salt: user.salt });

		if (passwordVerified.key !== user.password) {
			throw new Error('The password does not match.');
		}

		return user;
	}
}
