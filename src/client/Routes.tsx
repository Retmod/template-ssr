import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Home from './pages';
import Test from './pages/test';

export default function ClientRoutes() {
	const location = useLocation();
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path='test' element={<Test />} />
		</Routes>
	);
}
