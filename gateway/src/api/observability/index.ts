import { getHealthCheckRoute } from '@checkpoint/gateway/src/api/observability/routes/get-health-check';
import { OpenAPIHono } from '@hono/zod-openapi';

const observability = new OpenAPIHono<{ Bindings: GatewayEnv }>()
	.basePath('/v1/observability')
	.openapi(getHealthCheckRoute, async (context) => {
		return context.json(
			{ message: 'Checkpoint API v1 is up and running!' },
			200,
		);
	});

export default observability;
