import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		import('bootstrap/dist/js/bootstrap');
	}, []);
	useEffect(() => {
		typeof document !== undefined
			? require('bootstrap/dist/js/bootstrap')
			: null;
	}, []);
	return (
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
