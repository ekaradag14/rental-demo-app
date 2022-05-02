import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Materail UI
import {
	Grid,
	Box,
	Link,
	Typography,
	Container,
	CircularProgress,
} from '@mui/material';

import { Login } from '../../components/Login/Login';
import { SignUp } from '../../components/SignUp/SignUp';
import { useStyles } from './WelcomePage.style';

export const WelcomePage = ({ match }: any) => {
	const classes = useStyles();

	const [toBeRendered, setToBeRendered] = useState(match?.path || 'login');
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	useEffect(() => {
		setToBeRendered(match?.path);
	}, [match?.path]);

	const onLoad = () => {
		setIsImageLoaded(true);
	};

	return (
		<>
			{!isImageLoaded && (
				<Grid>
					<Container
						component="main"
						className={classes.formBlock}
						style={{ background: 'rgba(0,0,0,.7)' }}
					>
						<Grid justifyContent="center" className={classes.paper} container>
							<CircularProgress />
						</Grid>
					</Container>
				</Grid>
			)}
			<Grid
				style={{
					visibility: isImageLoaded ? 'visible' : 'hidden',
				}}
			>
				<img
					className={classes.image}
					onLoad={onLoad}
					src="https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4214&q=80"
					alt="background"
				/>
				<Container component="main" className={classes.formBlock}>
					<Grid justifyContent="center" className={classes.paper} container>
						<img
							className={classes.avatar}
							src="/bikyMini.png"
							alt="Biky Logo"
						/>
						<Grid>
							<Switch>
								{routes.map((route, index) => (
									<Route
										key={index}
										path={route.path}
										exact={route.exact}
										component={route.component}
									/>
								))}
							</Switch>
						</Grid>
					</Grid>
				</Container>
			</Grid>
		</>
	);
};

const routes = [
	{
		exact: true,
		path: '/login',
		component: Login,
	},
	{
		exact: true,
		path: '/signup',
		component: SignUp,
	},

	{
		exact: true,
		path: '*',
		component: () => <Redirect to="/login" />,
	},
];
