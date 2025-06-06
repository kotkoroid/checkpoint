import { WorkerEntrypoint } from 'cloudflare:workers';
import type * as schema from '@checkpoint/identity/src/database/schema';
import type { UserSelectType } from '@checkpoint/identity/src/types/user';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
export default class extends WorkerEntrypoint<IdentityEnv> {
    readonly database: DrizzleD1Database<typeof schema>;
    constructor(ctx: ExecutionContext, env: IdentityEnv);
    fetch(): Promise<Response>;
    checkEmailAvailability({ email }: {
        email: string;
    }): Promise<boolean>;
    checkUsernameAvailability({ username, }: {
        username: string;
    }): Promise<boolean>;
    createUser({ username, email, }: {
        username: string;
        email: string;
    }): Promise<UserSelectType | undefined>;
}
