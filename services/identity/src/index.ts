import { WorkerEntrypoint } from 'cloudflare:workers';
import type * as schema from '@checkpoint/identity/src/database/schema';
import type {
	AuthenticateUserInput,
	AuthenticateUserOutput,
} from '@checkpoint/identity/src/types/actions/authenticate-user';
import type { CheckEmailAvailabilityInput } from '@checkpoint/identity/src/types/actions/check-email-availability';
import type { CheckUsernameAvailabilityInput } from '@checkpoint/identity/src/types/actions/check-username-availability';
import type { CreateUserInput } from '@checkpoint/identity/src/types/actions/create-user';
import type { UserSelectType } from '@checkpoint/identity/src/types/entities/user';
import {
	createUser,
	getUserByEmail,
	getUserByEmailOrUsername,
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

	async checkEmailAvailability(
		input: CheckEmailAvailabilityInput,
	): Promise<boolean> {
		const { email } = input;

		const user = await getUserByEmail(this.database, email);

		return !user;
	}

	async checkUsernameAvailability(
		input: CheckUsernameAvailabilityInput,
	): Promise<boolean> {
		const { username } = input;

		const user = await getUserByUsername(this.database, username);

		return !user;
	}

	async createUser(
		input: CreateUserInput,
	): Promise<UserSelectType | undefined> {
		const { email, username, password } = input;

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

	async authenticateUser(
		input: AuthenticateUserInput,
	): Promise<AuthenticateUserOutput> {
		const { username, email, password } = input;

		const user = await getUserByEmailOrUsername(this.database, {
			email,
			username,
		});

		if (!user) {
			throw new Error('Invalid credentials.');
		}

		const passwordVerified = generatePassword({ password, salt: user.salt });

		if (passwordVerified.key !== user.password) {
			throw new Error('Invalid credentials.');
		}

		return { user };
	}
}
