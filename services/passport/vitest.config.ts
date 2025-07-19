import { defineWorkersProject } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersProject({
	test: {
		exclude: ['**/tsbuild'],
		poolOptions: {
			workers: {
				singleWorker: true,
				miniflare: {
					bindings: {
						ACCESS_TOKEN_SECRET: 'c46ffe6e-8892-4439-abc4-fa526d58c753',
						ACCESS_TOKEN_ISSUER: 'https://checkpoint.falkara.com',
						PRODUCT_AUDIENCE_MINERVA: 'https://api.minerva.falkara.com',
						REFRESH_TOKEN_SECRET: '0846bc55-c78c-49ea-8c3c-c88461a8c99c',
						REFRESH_TOKEN_ISSUER: 'https://checkpoint.falkara.com',
					},
				},
				wrangler: { configPath: './wrangler.jsonc' },
			},
		},
	},
});
