import { spawn } from 'node:child_process';

const buildWorker = async (cwd: string) => {
	const child = spawn('bun', ['wrangler', 'build'], { cwd });

	child.stdout?.on('data', (data) => process.stdout.write(data));
	child.stderr?.on('data', (data) => process.stderr.write(data));

	return new Promise<number>((resolve) => {
		child.on('close', (code) => resolve(code ?? -1));
	});
};

export default async () => {
	await buildWorker('./services/identity');
	await buildWorker('./services/passport');
};
