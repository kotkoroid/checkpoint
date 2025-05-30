import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { z } from 'zod';

const app = new Hono<{ Bindings: GatewayEnv }>();

app.get('/', async (c) => {
	return c.text('API is up and running. kthxbye');
});

app.post(
	'/users',
	validator('json', (value, c) => {
		const parsed = z
			.object({
				email: z.string().email(),
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

		const existingUserByEmail = await c.env.AUTH_SERVICE.checkEmailAvailability(
			{
				email,
			},
		);

		if (existingUserByEmail) {
			return c.json(
				{
					message: 'This email address is already taken.',
				},
				409,
			);
		}

		const existingUserByUsername =
			await c.env.AUTH_SERVICE.checkUsernameAvailability({
				username,
			});

		if (existingUserByUsername) {
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
