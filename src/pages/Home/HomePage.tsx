import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from '@mui/material';

import { useStyles } from './HomePage.style';

import { Main } from '../views/Main';

export const HomePage = (props: any) => {
	const classes = useStyles();

	return (
		<Grid>
			<Grid style={{ padding: 10 }}>
				<Main />
			</Grid>
		</Grid>
	);
};
const routes = [
	{
		exact: true,
		path: '/home',
		component: Main,
	},

	{
		exact: true,
		path: '*',
		component: () => <Redirect to="/home" />,
	},
];
