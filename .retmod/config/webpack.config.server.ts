import path from 'path';
import webpack, { Configuration } from 'webpack';
import paths from '../paths';
import ServerStarterPlugin from '../plugins/serverStarter';

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
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		modules: ['node_modules'],
	},
	node: {
		__dirname: false,
		__filename: false,
	},
	target: 'node',
	plugins: [new ServerStarterPlugin()],
};

export default config;
