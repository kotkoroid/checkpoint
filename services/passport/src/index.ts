import { env, WorkerEntrypoint } from 'cloudflare:workers';
import type {
	IssueAccessTokenInput,
	IssueAccessTokenOutput,
} from '@checkpoint/passport/src/types/actions/issue-access-token';
import type {
	IssueRefreshTokenInput,
	IssueRefreshTokenOutput,
} from '@checkpoint/passport/src/types/actions/issue-refresh-token';
import {
	createAccessToken,
	createRefreshToken,
} from '@checkpoint/passport/src/utils/jwt';

export default class extends WorkerEntrypoint<PassportEnv> {
	async fetch() {
		return new Response('Passport service is up and running. kthxbye');
	}

	async issueRefreshToken(
		input: IssueRefreshTokenInput,
	): Promise<IssueRefreshTokenOutput> {
		const { userId, audience, issueDate } = input;

		const refreshToken = await createRefreshToken({
			userId,
			audience,
			issueDate,
		});

		await env.KV_PASSPORT.put(refreshToken.jti, refreshToken.token);

		return refreshToken;
	}

	async issueAccessToken(
		input: IssueAccessTokenInput,
	): Promise<IssueAccessTokenOutput> {
		const { userId, audience, issueDate } = input;

		const accessToken = await createAccessToken({
			userId,
			audience,
			issueDate,
		});

		await env.KV_PASSPORT.put(accessToken.jti, accessToken.token);

		return accessToken;
	}
}
