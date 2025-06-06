import { WorkerEntrypoint } from 'cloudflare:workers';
import { randomUUID } from 'node:crypto';
import { createUser, getUserByEmail, getUserByUsername, } from '@checkpoint/identity/src/utils/database/user';
import { drizzle } from 'drizzle-orm/d1';
export default class extends WorkerEntrypoint {
    database;
    constructor(ctx, env) {
        super(ctx, env);
        this.database = drizzle(env.DATABASE_IDENTITY);
    }
    async fetch() {
        return new Response('Identity service is up and running. kthxbye');
    }
    async checkEmailAvailability({ email }) {
        const user = await getUserByEmail(this.database, email);
        return !user;
    }
    async checkUsernameAvailability({ username, }) {
        const user = await getUserByUsername(this.database, username);
        return !user;
    }
    async createUser({ username, email, }) {
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
