import { WorkerEntrypoint } from 'cloudflare:workers';

export default class extends WorkerEntrypoint<PassportEnv> {
	async fetch() {
		return new Response('Passport service is up and running. kthxbye');
	}
}
