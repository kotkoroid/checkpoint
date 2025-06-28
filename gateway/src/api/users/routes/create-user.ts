import { createRoute, z } from '@hono/zod-openapi';

const createUserRequestBodySchema = z.object({
	email: z.email(),
	username: z.string().nonempty().min(3),
	password: z.string().nonempty().min(8),
});

const createUserResponseBodySchema = z.object({
	message: z.string(),
});

export const createUserRoute = createRoute({
	method: 'post',
	path: '/v1/users',
	request: {
		body: {
			content: {
				'application/json': {
					schema: createUserRequestBodySchema,
				},
			},
			required: true,
		},
	},
	responses: {
		200: {
			content: {
				'application/json': {
					schema: createUserResponseBodySchema,
				},
			},
			description: 'Creates a user.',
		},
		409: {
			content: {
				'application/json': {
					schema: z.object({ message: z.string() }),
				},
			},
			description: 'Username or email is not available.',
		},
	},
});
