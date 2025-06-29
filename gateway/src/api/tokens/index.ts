import { createAccessTokenPairRoute } from '@checkpoint/gateway/src/api/tokens/routes/create-access-token-pair';
import { refreshAccessTokenPairRoute } from '@checkpoint/gateway/src/api/tokens/routes/refresh-access-token-pair';
import { revokeAccessTokenPairRoute } from '@checkpoint/gateway/src/api/tokens/routes/revoke-access-token-pair';
import { OpenAPIHono } from '@hono/zod-openapi';

const tokens = new OpenAPIHono<{ Bindings: GatewayEnv }>()
	.basePath('/v1/tokens')
	.openapi(createAccessTokenPairRoute, async (context) => {
		const { email, username, password } = context.req.valid('json');

		const authenticatedUser =
			await context.env.SERVICE_IDENTITY.authenticateUser({
				email,
				username,
				password,
			});

		if (!authenticatedUser) {
			return context.json({ message: 'Invalid credentials.' }, 401);
		}

		const accessToken = await context.env.SERVICE_PASSPORT.issueAccessToken({
			userId: authenticatedUser.id,
			product: 'MINERVA',
		});

		return context.json(
			{ accessToken: accessToken.token, refreshToken: '' },
			200,
		);
	})
	.openapi(refreshAccessTokenPairRoute, async (context) => {
		return context.json(
			{ message: 'Method not yet implemented. Come back later.' },
			501,
		);
	})
	.openapi(revokeAccessTokenPairRoute, async (context) => {
		return context.json(
			{ message: 'Method not yet implemented. Come back later.' },
			501,
		);
	});

export default tokens;
