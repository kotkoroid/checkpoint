import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		projects: [
			'./gateway/vitest.config.ts',
			'./services/identity/vitest.config.ts',
			'./services/passport/vitest.config.ts',
		],
		coverage: {
			// TODO: https://github.com/cloudflare/workerd/issues/2065
			provider: 'istanbul',
			exclude: [
				...coverageConfigDefaults.exclude,
				'**/*.config.ts',
				'**/dist',
				'**/tsbuild',
			],
		},
	},
});
