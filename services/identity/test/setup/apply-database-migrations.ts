import { applyD1Migrations, env } from 'cloudflare:test';

await applyD1Migrations(env.D1_IDENTITY, env.MIGRATIONS);
