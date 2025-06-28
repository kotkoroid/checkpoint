import { createRoute, z } from '@hono/zod-openapi';

const getHealthCheckResponseBody = z.object({
	message: z.string(),
});

export const getHealthCheckRoute = createRoute({
	method: 'get',
	path: '/healthcheck',
	responses: {
		200: {
			content: {
				'application/json': {
					schema: getHealthCheckResponseBody,
				},
			},
			description: 'Retrieves Checkpoint API v1 health check.',
		},
	},
});
