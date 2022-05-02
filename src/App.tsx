import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import { AlertBar } from './components/AlertBar/AlertBar';
import { ThemeProvider } from '@mui/styles';
import theme from './assets/theme';
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import './assets/style.css';
// import ViewBlogDialogue from '../../common/components/ViewBlogDialogue/ViewBlogDialogue';
// import { useAppDispatch, useAppSelector } from '../../common/redux/hooks';
// import { CommonActions } from '../../common/contexts/CommonSlice';

//Internal Components
// import { Main } from './Main/Main';
import { WelcomePage } from './pages/Welcome/WelcomePage';
import { HomePage } from './pages/Home/HomePage';
const App = () => {
	// const dispatch = useAppDispatch();
	// const { isAuth } = useAppSelector((state) => state.auth);
	// const { dialogs, alert } = useAppSelector((state) => state.common);
	const isAuth = false;
	return (
		<>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline enableColorScheme />

					<Router>
						{isAuth ? (
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

					{/* {alert?.isOpen && (
				<AlertBar
					{...alert}
					alertClear={() => dispatch(CommonActions.clearAlert())}
				/>
			)} */}
				</ThemeProvider>
			</StyledEngineProvider>
		</>
	);
};

const routes = {
	auth: [
		{
			exact: false,
			path: '/home',
			component: HomePage,
		},
		{
			exact: false,
			path: '/',
			component: () => <Redirect to="/" />,
		},
	],
	notAuth: [
		{
			exact: true,
			path: ['*'],
			parent: [],
			component: WelcomePage,
		},
	],
};

export default App;
