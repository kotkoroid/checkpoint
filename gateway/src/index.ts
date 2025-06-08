import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { z } from 'zod/v4';

const app = new Hono<{ Bindings: GatewayEnv }>();

app.get('/', async (c) => {
	return c.text('Falkara Checkpoint is operating without distruption. kthxbye');
});

app.post(
	'/users',
	validator('json', (value, context) => {
		const parseResult = z
			.object({
				email: z.email(),
				username: z.string().nonempty().min(3),
				password: z.string().nonempty().min(8),
			})
			.safeParse(value);

		if (!parseResult.success) {
			return context.json(
				{
					message: 'Provided input data are invalid.',
				},
				401,
			);
		}

		return parseResult.data;
	}),
	async (context) => {
		const { email, username, password } = context.req.valid('json');

		const emailAvailability =
			await context.env.IDENTITY_SERVICE.checkEmailAvailability({
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
			await context.env.IDENTITY_SERVICE.checkUsernameAvailability({
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

		await context.env.IDENTITY_SERVICE.createUser({
			username,
			email,
			password,
		});

		return context.json(
			{
				message: 'User was successfully registered.',
			},
			200,
		);
	},
);

export default app;
