import { createUserRoute } from '@checkpoint/gateway/src/api/users/routes/create-user';
import { OpenAPIHono } from '@hono/zod-openapi';

const users = new OpenAPIHono<{ Bindings: GatewayEnv }>().openapi(
	createUserRoute,
	async (context) => {
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
	},
);

export default users;
