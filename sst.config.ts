/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
	app(input) {
		return {
			name: 'checkpoint',
			removal: input.stage === 'production' ? 'retain' : 'remove',
			protect: ['production'].includes(input.stage),
			home: 'cloudflare',
			providers: { cloudflare: '6.2.0' },
		};
	},
	async run() {
		// Identity
		new sst.cloudflare.D1('identityD1', {
			transform: {
				database: {
					name: `checkpoint-identity-${$app.stage}`,
				},
			},
		});
	},
});
