import { defineWorkersProject } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersProject({
	test: {
		exclude: ['**/tsbuild'],
		globalSetup: ['./test/setup/build-services.ts'],
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.jsonc' },
				miniflare: {
					workers: [
						{
							name: 'checkpoint-identity-service',
							modules: [
								{
									type: 'ESModule',
									path: '../services/identity/dist/index.js',
								},
							],
							compatibilityDate: '2025-05-25',
							compatibilityFlags: ['nodejs_compat'],
						},
						{
							name: 'checkpoint-passport-service',
							modules: [
								{
									type: 'ESModule',
									path: '../services/passport/dist/index.js',
								},
							],
							compatibilityDate: '2025-05-25',
							compatibilityFlags: ['nodejs_compat'],
						},
					],
				},
			},
		},
	},
});
