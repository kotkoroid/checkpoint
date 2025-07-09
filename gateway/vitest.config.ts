import { defineWorkersProject } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersProject({
	test: {
		exclude: ['**/tsbuild'],
		globalSetup: ['./test/setup/build-services.ts'],
		poolOptions: {
			workers: {
				singleWorker: true,
				miniflare: {
					workers: [
						{
							name: 'checkpoint-identity-service',
							modules: [
								{
									path: '../services/identity/dist/index.js',
									type: 'ESModule',
								},
							],
							compatibilityDate: '2025-05-25',
							compatibilityFlags: ['nodejs_compat'],
						},
						{
							name: 'checkpoint-passport-service',
							modules: [
								{
									path: '../services/passport/dist/index.js',
									type: 'ESModule',
								},
							],
							compatibilityDate: '2025-05-25',
							compatibilityFlags: ['nodejs_compat'],
						},
					],
				},
				wrangler: { configPath: './wrangler.jsonc' },
			},
		},
	},
});
