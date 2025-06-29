import { createRoute, z } from '@hono/zod-openapi';

const refreshAccessTokenPairRequestBodySchema = z.object({
	refreshToken: z.jwt(),
});

const refreshAccessTokenPairResponseBodySchema = z.object({
	accessToken: z.jwt(),
	refreshToken: z.jwt(),
});

export const refreshAccessTokenPairRoute = createRoute({
	method: 'put',
	path: '/v1/tokens',
	request: {
		body: {
			content: {
				'application/json': {
					schema: refreshAccessTokenPairRequestBodySchema,
				},
			},
			required: true,
		},
	},
	responses: {
		200: {
			content: {
				'application/json': {
					schema: refreshAccessTokenPairResponseBodySchema,
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
