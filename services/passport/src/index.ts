import { env, WorkerEntrypoint } from 'cloudflare:workers';
import type { Product } from '@checkpoint/passport/src/types/product';
import { createAccessToken } from '@checkpoint/passport/src/utils/jwt';

export default class extends WorkerEntrypoint<PassportEnv> {
	async fetch() {
		return new Response('Passport service is up and running. kthxbye');
	}

	async issueAccessToken({
		userId,
		product,
	}: {
		userId: string;
		product: Product;
	}) {
		const accessToken = await createAccessToken({
			userId,
			product,
		});

		await env.KV_PASSPORT.put(accessToken.jti, accessToken.token);

		return accessToken;
	}
}
