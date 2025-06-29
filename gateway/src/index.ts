import observability from '@checkpoint/gateway/src/api/observability';
import tokens from '@checkpoint/gateway/src/api/tokens';
import users from '@checkpoint/gateway/src/api/users';
import { OpenAPIHono } from '@hono/zod-openapi';

const app = new OpenAPIHono<{ Bindings: GatewayEnv }>();

app.route('/', observability);

app.route('/', tokens);

app.route('/', users);

app.doc('/v1/observability/open-api', {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Checkpoint API',
	},
});

export default app;
