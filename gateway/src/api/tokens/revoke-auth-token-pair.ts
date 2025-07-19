import type { RouteHandler } from '@hono/zod-openapi';
import { createRoute, z } from '@hono/zod-openapi';

const requestBodySchema = z.object({
	accessToken: z.jwt(),
});

const responseBodySchema = z.object({
	message: z.string(),
	accessToken: z.jwt(),
});

export const revokeAuthTokenPairRoute = createRoute({
	method: 'delete',
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
			description: 'Revokes the access token and the refresh token.',
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

export const revokeAuthTokenPairHandler: RouteHandler<
	typeof revokeAuthTokenPairRoute,
	{ Bindings: GatewayEnv }
> = async (context) => {
	return context.json(
		{ message: 'Method not yet implemented. Come back later.' },
		501,
	);
};
