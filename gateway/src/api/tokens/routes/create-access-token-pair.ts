import { createRoute, z } from '@hono/zod-openapi';

const createAccessTokenPairRequestBodySchema = z
	.object({
		username: z.string().optional(),
		email: z.email().optional(),
		password: z.string(),
	})
	.refine((data) => data.username || data.email, {
		message: 'Either username or email must be provided!',
	});

const createAccessTokenPairResponseBodySchema = z.object({
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
					schema: createAccessTokenPairRequestBodySchema,
				},
			},
			required: true,
		},
	},
	responses: {
		200: {
			content: {
				'application/json': {
					schema: createAccessTokenPairResponseBodySchema,
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
