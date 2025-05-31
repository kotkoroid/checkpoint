import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		workspace: ['gateway/vitest.config.ts', 'services/**/vitest.config.ts'],
		coverage: {
			provider: 'istanbul',
			exclude: [
				...coverageConfigDefaults.exclude,
				'**/tsbuild',
				'sst.config.ts',
			],
			excludeAfterRemap: true,
		},
	},
});
