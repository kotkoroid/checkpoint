import {
	getHealthCheckHandler,
	getHealthCheckRoute,
} from '@checkpoint/gateway/src/api/observability/get-health-check';
import {
	createAccessTokenPairHandler,
	createAccessTokenPairRoute,
} from '@checkpoint/gateway/src/api/tokens/create-access-token-pair';
import {
	refreshAccessTokenPairHandler,
	refreshAccessTokenPairRoute,
} from '@checkpoint/gateway/src/api/tokens/refresh-access-token-pair';
import {
	revokeAccessTokenPairHandler,
	revokeAccessTokenPairRoute,
} from '@checkpoint/gateway/src/api/tokens/revoke-access-token-pair';
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
		.openapi(createAccessTokenPairRoute, createAccessTokenPairHandler)
		.openapi(refreshAccessTokenPairRoute, refreshAccessTokenPairHandler)
		.openapi(revokeAccessTokenPairRoute, revokeAccessTokenPairHandler),
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
