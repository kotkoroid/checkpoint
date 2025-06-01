import { defineWorkersProject } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersProject({
	test: {
		exclude: ['**/tsbuild'],
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.temp.jsonc' },
			},
		},
	},
});
