import observability from '@checkpoint/gateway/src/api/observability';
import users from '@checkpoint/gateway/src/api/users';
import { OpenAPIHono } from '@hono/zod-openapi';

const app = new OpenAPIHono<{ Bindings: GatewayEnv }>();

app.route('/v1/observability', observability);

app.route('/v1/users', users);

app.doc('/open-api', {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Checkpoint API',
	},
});

export default app;
