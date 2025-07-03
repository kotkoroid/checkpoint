import type { RouteHandler } from '@hono/zod-openapi';
import { createRoute, z } from '@hono/zod-openapi';

const requestBodySchema = z
	.object({
		username: z.string().optional(),
		email: z.email().optional(),
		password: z.string(),
	})
	.refine((data) => data.username || data.email, {
		message: 'Either username or email must be provided!',
	});

const responseBodySchema = z.object({
	accessToken: z.jwt(),
	refreshToken: z.jwt(),
});

export const createAccessTokenPairRoute = createRoute({
	method: 'post',
	path: '/',
	request: {
		body: {
			content: {
				'application/json': {
					schema: requestBodySchema,
				},
			},
			required: true,
		},
	},
	responses: {
		200: {
			content: {
				'application/json': {
					schema: responseBodySchema,
				},
			},
			description: 'Creates an access token and a refresh token.',
		},
		401: {
			content: {
				'application/json': {
					schema: z.object({
						message: z.string(),
					}),
				},
			},
			description: 'Provided credentials are invalid.',
		},
	},
});

export const createAccessTokenPairHandler: RouteHandler<
	typeof createAccessTokenPairRoute,
	{ Bindings: GatewayEnv }
> = async (context) => {
	const { email, username, password } = context.req.valid('json');

	const authenticatedUser = await context.env.SERVICE_IDENTITY.authenticateUser(
		{
			email,
			username,
			password,
		},
	);

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
};
