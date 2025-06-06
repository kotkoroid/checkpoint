import { applyD1Migrations, env } from 'cloudflare:test';

await applyD1Migrations(env.DATABASE_IDENTITY, env.MIGRATIONS);
