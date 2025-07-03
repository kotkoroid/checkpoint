import type { RouteHandler } from '@hono/zod-openapi';
import { createRoute, z } from '@hono/zod-openapi';

const requestBodySchema = z.object({
	refreshToken: z.jwt(),
});

const responseBodySchema = z.object({
	accessToken: z.jwt(),
	refreshToken: z.jwt(),
});

export const refreshAccessTokenPairRoute = createRoute({
	method: 'put',
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
			description: 'Refreshes the access token and the refresh token.',
		},
		501: {
			content: {
				'application/json': {
					schema: z.object({
						message: z.string(),
					}),
				},
			},
			description: 'Method is not implemented yet.',
		},
	},
});

export const refreshAccessTokenPairHandler: RouteHandler<
	typeof refreshAccessTokenPairRoute,
	{ Bindings: GatewayEnv }
> = async (context) => {
	return context.json(
		{ message: 'Method not yet implemented. Come back later.' },
		501,
	);
};
