import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import ClientRoutes from '../client/Routes';
import express from 'express';
import path from 'path';
import React, { Suspense } from 'react';
import { readFile } from 'fs/promises';
import mongo from 'mongoose';

interface Middleware {
	(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	): void;
}

mongo.connect('mongodb://localhost:27017/test');

const app = express();

const distDir = path.join(__dirname, '..');
const template = path.join(distDir, 'client', 'index.html');

app.use('/client', express.static(path.join(distDir, 'client')));

const handleSSR: Middleware = async (req, res) => {
	const file = (await readFile(template, 'utf8')).replace(
		'<div id="root"></div>',
		await renderToString(
			<div id='root'>
				<Suspense>
					<StaticRouter location={req.originalUrl}>
						<ClientRoutes />
					</StaticRouter>
				</Suspense>
			</div>,
		),
	);

	res.send(file);
};

app.get('*', handleSSR);

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
