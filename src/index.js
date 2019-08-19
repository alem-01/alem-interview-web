import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/auth'
import ErrorBoudry from './components/error-boundry';

ReactDOM.render(
	<ErrorBoudry>
		<Auth />
	</ErrorBoudry>,
	document.getElementById('root')
);