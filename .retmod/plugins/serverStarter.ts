import { spawn } from 'child_process';
import * as webpack from 'webpack';

export default function serverStarter(compiler: webpack.Compiler) {
	// if the compiler is not in watch mode, return
	if (!compiler.options.watch) return;

	// check if compiler has finished compiling
	let isCompiled = false;
	compiler.hooks.done.tap('done', () => {
		isCompiled = true;
	});

	// create a new child process
	let childProcess = spawn('node', ['.retmod/dist/server/main.js'], {
		stdio: 'inherit',
	});

	// watch for changes in the compiler
	compiler.hooks.watchRun.tap('watchRun', () => {
		// if the compiler has finished compiling, restart the child process
		if (isCompiled) {
			// kill the child process
			childProcess.kill();

			// create a new child process
			childProcess = spawn('node', ['.retmod/dist/server/main.js'], {
				stdio: 'inherit',
			});

			// set isCompiled to false
			isCompiled = false;
		}
	});
}
