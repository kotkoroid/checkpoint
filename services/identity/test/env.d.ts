declare module 'cloudflare:test' {
	interface ProvidedEnv extends IdentityEnv {
		MIGRATIONS: D1Migration[];
	}

	export const SELF: Service<import('../src/index').default>;
}
