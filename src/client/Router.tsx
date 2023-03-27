import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ClientRoutes from './Routes';

export default function Router() {
	return (
		<BrowserRouter>
			<ClientRoutes />
		</BrowserRouter>
	);
}
