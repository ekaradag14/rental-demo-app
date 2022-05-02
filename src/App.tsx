import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import { AlertBar } from './components/AlertBar/AlertBar';
import AppBar from './components/AppBar/AppBar';

import './assets/style.css';
// import ViewBlogDialogue from '../../common/components/ViewBlogDialogue/ViewBlogDialogue';
// import { useAppDispatch, useAppSelector } from '../../common/redux/hooks';
// import { CommonActions } from '../../common/contexts/CommonSlice';

//Internal Components
// import { Main } from './Main/Main';
import { WelcomePage } from './pages/Welcome/WelcomePage';
import { HomePage } from './pages/Home/HomePage';
import { CreateBikePage } from './pages/CreateBike/CreateBikePage';
const App = () => {
	// const dispatch = useAppDispatch();
	// const { isAuth } = useAppSelector((state) => state.auth);
	// const { dialogs, alert } = useAppSelector((state) => state.common);
	const isAuth = true;
	return (
		<>
			<Router>
				{isAuth ? (
					<>
						<AppBar />
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

			{/* {alert?.isOpen && (
				<AlertBar
					{...alert}
					alertClear={() => dispatch(CommonActions.clearAlert())}
				/>
			)} */}
		</>
	);
};

const routes = {
	auth: [
		{
			exact: true,
			path: '/home',
			component: HomePage,
		},
		{
			exact: true,
			path: '/create-bike',
			component: CreateBikePage,
		},
		{
			exact: false,
			path: '*',
			component: () => <Redirect to="/home" />,
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
