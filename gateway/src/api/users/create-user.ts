import type { RouteHandler } from '@hono/zod-openapi';
import { createRoute, z } from '@hono/zod-openapi';

const requestBodySchema = z.object({
	email: z.email(),
	username: z.string().nonempty().min(3),
	password: z.string().nonempty().min(8),
});

const responseBodySchema = z.object({
	message: z.string(),
});

export const createUserRoute = createRoute({
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

export const createUserHandler: RouteHandler<
	typeof createUserRoute,
	{ Bindings: GatewayEnv }
> = async (context) => {
	const { email, username, password } = context.req.valid('json');

	const emailAvailability =
		await context.env.SERVICE_IDENTITY.checkEmailAvailability({
			email,
		});

	if (!emailAvailability) {
		return context.json(
			{
				message: 'This email address is already taken.',
			},
			409,
		);
	}

	const usernameAvailability =
		await context.env.SERVICE_IDENTITY.checkUsernameAvailability({
			username,
		});

	if (!usernameAvailability) {
		return context.json(
			{
				message: 'This username is already taken.',
			},
			409,
		);
	}

	await context.env.SERVICE_IDENTITY.createUser({
		username,
		email,
		password,
	});

	return context.json(
		{
			message: 'User was successfully created.',
		},
		200,
	);
};
