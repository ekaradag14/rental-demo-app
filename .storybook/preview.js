import { useReducer } from 'react';
import BikesContext from '../src/contexts/bikes/context';
import bikeReducer from '../src/contexts/bikes/reducer';
import { bikesData } from '../src/data/bikes';

import UserContext from '../src/contexts/user/context';
import userReducer from '../src/contexts/user/reducer';


export const decorators = [
	(Story) => {
		const [bikes, bikesDispatch] = useReducer(bikeReducer, bikesData);
		const [user, userDispatch] = useReducer(userReducer, UserContext);
		return (
			<BikesContext.Provider value={{ bikes, bikesDispatch }}>
				<UserContext.Provider value={{ user, userDispatch }}>
					<Story />
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
