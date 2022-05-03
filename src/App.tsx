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

import './assets/style.css';
// import ViewBlogDialogue from '../../common/components/ViewBlogDialogue/ViewBlogDialogue';
// import { useAppDispatch, useAppSelector } from '../../common/redux/hooks';
// import { CommonActions } from '../../common/contexts/CommonSlice';

import { WelcomePage } from './pages/Welcome/WelcomePage';
import { HomePage } from './pages/Home/HomePage';
import { CreateBikePage } from './pages/CreateBike/CreateBikePage';
import { SearchPage } from './pages/Search/SearchPage';
const App = () => {
	// const dispatch = useAppDispatch();
	// const { isAuth } = useAppSelector((state) => state.auth);
	// const { dialogs, alert } = useAppSelector((state) => state.common);
	const isAuth = true;
	const isManager = true;

	let defaultAuthRoutes = [
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
	if (isManager) {
		defaultAuthRoutes = [
			{
				exact: true,
				path: '/create-bike',
				component: CreateBikePage,
			},
			...defaultAuthRoutes,
		];
	}

	const routes = {
		auth: defaultAuthRoutes,
		notAuth: [
			{
				exact: true,
				path: ['*'],
				parent: [],
				component: WelcomePage,
			},
		],
	};
	return (
		<>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Router>
					{isAuth ? (
						<>
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
