import React, { useState, useEffect, useReducer, useContext } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import { AlertBar } from './components/AlertBar/AlertBar';
import AppBar from './components/AppBar/AppBar';
import { Grid } from '@mui/material';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { WelcomePage } from './pages/Welcome/WelcomePage';
import { HomePage } from './pages/Home/HomePage';
import { SearchPage } from './pages/Search/SearchPage';
import { AppDataPage } from './pages/AppData/AppDataPage';

import BikesContext from './contexts/bikes/context';
import bikeReducer from './contexts/bikes/reducer';
import { bikesData } from './data/bikes';

import UserContext from './contexts/user/context';
import userReducer from './contexts/user/reducer';

import AllUserContext from './contexts/allUsers/context';
import allUserReducer from './contexts/allUsers/reducer';
import { usersData } from './data/users';

import './assets/style.css';
import { setUser } from './contexts/user/dispatchController';
import { setBikesToContext } from './contexts/bikes/dispatchController';
// import ViewBlogDialogue from '../../common/components/ViewBlogDialogue/ViewBlogDialogue';
// import { useAppDispatch, useAppSelector } from '../../common/redux/hooks';
// import { CommonActions } from '../../common/contexts/CommonSlice';

const defaultAuthRoutes = [
	{
		exact: true,
		path: '/home',
		component: HomePage,
	},

	{
		exact: true,
		path: '/search',
		component: SearchPage,
	},

	{
		exact: false,
		path: '*',
		component: () => <Redirect to="/home" />,
	},
];

const managerAuthRoutes = [
	{
		exact: true,
		path: '/app-data',
		component: AppDataPage,
	},
	{
		exact: true,
		path: '/home',
		component: HomePage,
	},

	{
		exact: true,
		path: '/search',
		component: SearchPage,
	},

	{
		exact: false,
		path: '*',
		component: () => <Redirect to="/home" />,
	},
];

const App = () => {
	// const dispatch = useAppDispatch();
	// const { isAuth } = useAppSelector((state) => state.auth);
	// const { dialogs, alert } = useAppSelector((state) => state.common);

	const [bikes, bikesDispatch] = useReducer(bikeReducer, bikesData);
	const [user, userDispatch] = useReducer(userReducer, UserContext);
	const [allUsers, allUsersDispatch] = useReducer(allUserReducer, usersData);
	const isAuth = !!user?.email;
	const isManager = user?.role === 'manager';

	const routes = {
		auth: isManager ? managerAuthRoutes : defaultAuthRoutes,
		notAuth: [
			{
				exact: true,
				path: ['*'],
				parent: [],
				component: WelcomePage,
			},
		],
	};

	useEffect(() => {
		let currentUser = JSON.parse(localStorage.getItem('userContextValue'));
		if (currentUser) {
			userDispatch(setUser(currentUser));
		}
		let bikes = JSON.parse(localStorage.getItem('bikeContextValues'));
		if (bikes) {
			bikesDispatch(setBikesToContext(bikes));
		}
	}, []);

	return (
		<>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<UserContext.Provider value={{ user, userDispatch }}>
					<AllUserContext.Provider value={{ allUsers, allUsersDispatch }}>
						<Router>
							{isAuth ? (
								<>
									{/* @ts-ignore */}
									<BikesContext.Provider value={{ bikes, bikesDispatch }}>
										<AppBar />
										<Grid style={{ height: 70 }} />
										<Switch>
											{routes.auth.map(({ path, exact, component }, index) => (
												<Route
													key={index}
													exact={exact}
													path={path}
													component={component}
												/>
											))}
										</Switch>
									</BikesContext.Provider>
								</>
							) : (
								<WelcomePage>
									{routes.notAuth.map(({ path, exact, component }, index) => (
										<Route
											key={index}
											path={path}
											exact={exact}
											component={component}
										/>
									))}
								</WelcomePage>
							)}
						</Router>
					</AllUserContext.Provider>
				</UserContext.Provider>
			</MuiPickersUtilsProvider>
			{/* {alert?.isOpen && (
				<AlertBar
					{...alert}
					alertClear={() => dispatch(CommonActions.clearAlert())}
				/>
			)} */}
		</>
	);
};

export default App;
