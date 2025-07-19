import {
	getHealthCheckHandler,
	getHealthCheckRoute,
} from '@checkpoint/gateway/src/api/observability/get-health-check';
import {
	createAuthTokenPairHandler,
	createAuthTokenPairRoute,
} from '@checkpoint/gateway/src/api/tokens/create-auth-token-pair';
import {
	refreshAuthTokenPairHandler,
	refreshAuthTokenPairRoute,
} from '@checkpoint/gateway/src/api/tokens/refresh-auth-token-pair';
import {
	revokeAuthTokenPairHandler,
	revokeAuthTokenPairRoute,
} from '@checkpoint/gateway/src/api/tokens/revoke-auth-token-pair';
import {
	createUserHandler,
	createUserRoute,
} from '@checkpoint/gateway/src/api/users/create-user';
import { OpenAPIHono } from '@hono/zod-openapi';

const api = new OpenAPIHono();

api.route(
	'/v1/observability',
	new OpenAPIHono<{ Bindings: GatewayEnv }>().openapi(
		getHealthCheckRoute,
		getHealthCheckHandler,
	),
);

api.route(
	'/v1/tokens',
	new OpenAPIHono<{ Bindings: GatewayEnv }>()
		.openapi(createAuthTokenPairRoute, createAuthTokenPairHandler)
		.openapi(refreshAuthTokenPairRoute, refreshAuthTokenPairHandler)
		.openapi(revokeAuthTokenPairRoute, revokeAuthTokenPairHandler),
);

api.route(
	'/v1/users',
	new OpenAPIHono<{ Bindings: GatewayEnv }>().openapi(
		createUserRoute,
		createUserHandler,
	),
);

api.doc('/open-api', {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Checkpoint API',
	},
});

export default api;
