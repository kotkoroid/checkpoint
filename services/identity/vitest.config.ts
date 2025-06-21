import {
	defineWorkersProject,
	readD1Migrations,
} from '@cloudflare/vitest-pool-workers/config';
import { join } from '@std/path';

export default defineWorkersProject({
	test: {
		exclude: ['**/tsbuild'],
		setupFiles: ['./test/setup/appply-database-migrations.ts'],
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.jsonc' },
				miniflare: {
					bindings: {
						MIGRATIONS: await readD1Migrations(
							join(__dirname, './src/database/migrations'),
						),
					},
				},
			},
		},
	},
});
