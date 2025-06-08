import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		projects: [
			'./gateway/vitest.config.ts',
			'./services/identity/vitest.config.ts',
			'./services/passport/vitest.config.ts',
		],
		coverage: {
			// TODO: Using V8 for code coverage is not yet supported: https://developers.cloudflare.com/workers/testing/vitest-integration/known-issues/#coverage
			provider: 'istanbul',
			exclude: [
				...coverageConfigDefaults.exclude,
				'./*.config.ts',
				'**/tsbuild',
			],
		},
	},
});
