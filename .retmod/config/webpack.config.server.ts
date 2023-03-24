import path from 'path';
import type { Configuration } from 'webpack';
import paths from '../paths';
import ShellPlugin from 'webpack-shell-plugin-next';
import { spawn } from 'child_process';
import serverStarter from '../plugins/serverStarter';

const config: Configuration = {
	entry: [path.join(paths.rootFolder, 'src', 'server', 'index.tsx')],
	output: {
		filename: '[name].js',
		path: path.join(paths.rootFolder, '.retmod', 'dist', 'server'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'esbuild-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: ['node_modules'],
	},
	node: {
		__dirname: false,
		__filename: false,
	},
	target: 'node',
	plugins: [serverStarter],
};

export default config;
