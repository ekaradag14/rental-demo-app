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
import { ReservationsPage } from './pages/Reservations/ReservationsPage';

import BikesContext from './contexts/bikes/context';
import bikeReducer from './contexts/bikes/reducer';
import { bikesData } from './data/bikes';

import UserContext from './contexts/user/context';
import userReducer from './contexts/user/reducer';

import AlertContext from './contexts/alert/context';
import alertReducer from './contexts/alert/reducer';
import { clearAlert } from './contexts/alert/dispatchController';

import AllUserContext from './contexts/allUsers/context';
import allUserReducer from './contexts/allUsers/reducer';
import { usersData } from './data/users';

import './assets/style.css';
import { setUser } from './contexts/user/dispatchController';
import { setBikesToContext } from './contexts/bikes/dispatchController';
import { setAllUser } from './contexts/allUsers/dispatchController';

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
		path: '/reservations',
		component: ReservationsPage,
	},
	...defaultAuthRoutes,
];

const App = () => {
	const [bikes, bikesDispatch] = useReducer(bikeReducer, bikesData);
	const [user, userDispatch] = useReducer(userReducer, UserContext);
	const [alert, alertDispatch] = useReducer(alertReducer, AlertContext);
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
		// Set user
		let currentUser = JSON.parse(localStorage.getItem('userContextValue'));
		if (currentUser) {
			userDispatch(setUser(currentUser));
		}

		// Set bikes data
		let bikes = JSON.parse(localStorage.getItem('bikeContextValues'));
		if (bikes) {
			bikesDispatch(setBikesToContext(bikes));
		} else {
			bikesDispatch(setBikesToContext(bikesData));
		}

		// Set application users
		let allUsers = JSON.parse(localStorage.getItem('allUsersContextValues'));
		if (allUsers) {
			allUsersDispatch(setAllUser(allUsers));
		} else if (isManager) {
			allUsersDispatch(setAllUser(usersData));
		}
	}, []);

	return (
		<>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<AlertContext.Provider value={{ alert, alertDispatch }}>
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
												{routes.auth.map(
													({ path, exact, component }, index) => (
														<Route
															key={index}
															exact={exact}
															path={path}
															component={component}
														/>
													)
												)}
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
					{alert?.isOpen && (
						<AlertBar
							{...alert}
							alertClear={() => alertDispatch(clearAlert())}
						/>
					)}
				</AlertContext.Provider>
			</MuiPickersUtilsProvider>
		</>
	);
};

export default App;
