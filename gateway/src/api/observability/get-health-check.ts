import type { RouteHandler } from '@hono/zod-openapi';
import { createRoute, z } from '@hono/zod-openapi';

const responseBody = z.object({
	message: z.string(),
});

export const getHealthCheckRoute = createRoute({
	method: 'get',
	path: '/healthcheck',
	responses: {
		200: {
			content: {
				'application/json': {
					schema: responseBody,
				},
			},
			description: 'Retrieves Checkpoint API v1 health check.',
		},
	},
});

export const getHealthCheckHandler: RouteHandler<
	typeof getHealthCheckRoute,
	{ Bindings: GatewayEnv }
> = async (context) => {
	return context.json({ message: 'Checkpoint API v1 is up and running!' }, 200);
};
