import { WorkerEntrypoint } from 'cloudflare:workers';
export default class extends WorkerEntrypoint<PassportEnv> {
    fetch(): Promise<Response>;
}
