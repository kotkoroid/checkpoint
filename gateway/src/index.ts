import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { z } from 'zod/v4';

const app = new Hono<{ Bindings: GatewayEnv }>();

app.get('/', async (c) => {
	return c.text('API is up and running. kthxbye');
});

app.post(
	'/users',
	validator('json', (value, c) => {
		const parsed = z
			.object({
				email: z.email(),
				username: z.string().nonempty(),
			})
			.safeParse(value);

		if (!parsed.success) {
			return c.json(
				{
					message: 'Provided input data are invalid.',
				},
				401,
			);
		}

		return parsed.data;
	}),
	async (c) => {
		const { email, username } = c.req.valid('json');

		const emailAvailability = await c.env.AUTH_SERVICE.checkEmailAvailability({
			email,
		});

		if (!emailAvailability) {
			return c.json(
				{
					message: 'This email address is already taken.',
				},
				409,
			);
		}

		const usernameAvailability =
			await c.env.AUTH_SERVICE.checkUsernameAvailability({
				username,
			});

		if (!usernameAvailability) {
			return c.json(
				{
					message: 'This username is already taken.',
				},
				409,
			);
		}

		await c.env.AUTH_SERVICE.createUser({
			username,
			email,
		});

		return c.json(
			{
				message: 'User was successfully registered.',
			},
			200,
		);
	},
);

export default app;
