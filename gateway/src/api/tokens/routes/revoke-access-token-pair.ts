import { createRoute, z } from '@hono/zod-openapi';

const revokeAccessTokenPairRequestBodySchema = z.object({
	accessToken: z.jwt(),
});

const revokeAccessTokenPairResponseBodySchema = z.object({
	message: z.string(),
	accessToken: z.jwt(),
});

export const revokeAccessTokenPairRoute = createRoute({
	method: 'delete',
	path: '/v1/tokens',
	request: {
		body: {
			content: {
				'application/json': {
					schema: revokeAccessTokenPairRequestBodySchema,
				},
			},
			required: true,
		},
	},
	responses: {
		200: {
			content: {
				'application/json': {
					schema: revokeAccessTokenPairResponseBodySchema,
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
