declare module 'cloudflare:test' {
	interface ProvidedEnv extends PassportEnv {}

	export const SELF: Service<import('../src/index').default>;
}
