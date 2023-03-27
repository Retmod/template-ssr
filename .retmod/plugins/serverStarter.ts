import { spawn } from 'child_process';
import * as webpack from 'webpack';

class ServerStarterPlugin {
	apply(compiler: webpack.Compiler) {
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

		// log out the child process's stdout
		childProcess.stdout?.on('data', (data) => {
			console.log(data.toString());
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

				childProcess.stdout?.on('data', (data) => {
					console.log(data.toString());
				});

				// set isCompiled to false
				isCompiled = false;
			}
		});

		// watch for the compiler to close
		compiler.hooks.watchClose.tap('watchClose', () => {
			// kill the child process
			childProcess.kill();
		});
	}
}

export default ServerStarterPlugin;
