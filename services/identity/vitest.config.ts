import {
	defineWorkersProject,
	readD1Migrations,
} from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersProject({
	test: {
		exclude: ['**/tsbuild'],
		setupFiles: ['./test/setup/apply-database-migrations.ts'],
		poolOptions: {
			workers: {
				singleWorker: true,
				miniflare: {
					bindings: {
						MIGRATIONS: await readD1Migrations(
							'./services/identity/src/database/migrations',
						),
					},
				},
				wrangler: { configPath: './wrangler.jsonc' },
			},
		},
	},
});
