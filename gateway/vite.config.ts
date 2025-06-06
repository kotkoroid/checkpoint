import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 8080,
	},
	plugins: [
		// TODO: https://github.com/cloudflare/workers-sdk/issues/9511
		cloudflare({
			persistState: {
				path: '../services/identity/.wrangler/state',
			},
		}),
	],
});
