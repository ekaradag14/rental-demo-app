import { useReducer } from 'react';
import BikesContext from '../src/contexts/bikes/context';
import bikeReducer from '../src/contexts/bikes/reducer';
import { bikesData } from '../src/data/bikes';

import UserContext from '../src/contexts/user/context';
import userReducer from '../src/contexts/user/reducer';

import AlertContext from '../src/contexts/alert/context';
import alertReducer from '../src/contexts/alert/reducer';

export const decorators = [
	(Story) => {
		const [bikes, bikesDispatch] = useReducer(bikeReducer, bikesData);
		const [user, userDispatch] = useReducer(userReducer, UserContext);
		const [alert, alertDispatch] = useReducer(userReducer, UserContext);
		return (
			<BikesContext.Provider value={{ bikes, bikesDispatch }}>
				<UserContext.Provider value={{ user, userDispatch }}>
					<AlertContext.Provider value={{ alert, alertDispatch }}>
						<Story />
					</AlertContext.Provider>
				</UserContext.Provider>
			</BikesContext.Provider>
		);
	},
];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
