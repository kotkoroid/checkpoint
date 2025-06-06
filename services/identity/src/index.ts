import { WorkerEntrypoint } from 'cloudflare:workers';
import { randomUUID } from 'node:crypto';
import type * as schema from '@checkpoint/identity/src/database/schema';
import type { UserSelectType } from '@checkpoint/identity/src/types/user';
import {
	createUser,
	getUserByEmail,
	getUserByUsername,
} from '@checkpoint/identity/src/utils/database/user';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';

export default class extends WorkerEntrypoint<IdentityEnv> {
	readonly database: DrizzleD1Database<typeof schema>;

	constructor(ctx: ExecutionContext, env: IdentityEnv) {
		super(ctx, env);

		this.database = drizzle(env.DATABASE_IDENTITY);
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
	}: {
		username: string;
		email: string;
	}): Promise<UserSelectType | undefined> {
		const user = await createUser(this.database, {
			id: randomUUID(),
			createdAt: new Date(),
			username,
			email,
			password: randomUUID(),
			salt: randomUUID(),
			status: 'UNVERIFIED',
		});

		return user;
	}
}
