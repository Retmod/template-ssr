import path from 'path';
import { Configuration } from 'webpack';
import paths from '../paths';
import HTMLPlugin from 'html-webpack-plugin';

const config: Configuration = {
	entry: path.join(paths.rootFolder, 'src', 'client', 'index.tsx'),
	output: {
		filename: '[name].js',
		path: path.join(paths.rootFolder, '.retmod', 'dist', 'client'),
		publicPath: '/client',
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [
		new HTMLPlugin({
			template: paths.htmlTemplate,
		}),
	],
	resolve: {
		extensions: [
			'.js',
			'.ts',
			'.jsx',
			'.tsx',
			'.css',
			'.png',
			'.svg',
			'.ttf',
			'.gif',
			'.webp',
			'.jpg',
			'.jpeg',
		],
	},
	stats: {
		errorDetails: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
				],
			},
			{
				test: /\.s[ca]ss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
				],
			},
			{
				test: /\.tsx?$/,
				loader: 'esbuild-loader',
				options: {
					loader: 'tsx',
					target: 'esnext',
				},
			},
			{
				test: /\.(png|ttf|svg|gif|webp|jpg|jpeg)$/, // to import images and fonts
				loader: 'url-loader',
				options: { limit: false },
			},
		],
	},
};

export default config;
