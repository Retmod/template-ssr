import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const navigate = useNavigate();
	return (
		<div className='px-2 container mx-auto'>
			<h1>Welcome to the home page!</h1>
			<button
				className='bg-blue-500 rounded-lg p-2'
				onClick={() => {
					navigate('/test');
				}}
			>
				Test page
			</button>
		</div>
	);
}
