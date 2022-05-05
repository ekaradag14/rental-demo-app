import { UserProps } from './../../common/types';
const allUserReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'ADD_USER':
			state = [
				{
					...action.user,
				},
				...state,
			];
			localStorage.setItem('allUsersContextValues', JSON.stringify(state));
			return state;
		case 'UPDATE_USER':
			state.find((user: any, index: number) => {
				if (user.id === action.user.id) {
					state[index] = action.user;
					return true;
				}
			});
			localStorage.setItem('allUsersContextValues', JSON.stringify(state));
			return state;
		case 'REMOVE_USERS':
			state = state.filter((user: UserProps) => !action.ids.includes(user.id));
			localStorage.setItem('allUsersContextValues', JSON.stringify(state));
			return state;
		case 'SET_ALL_USER':
			localStorage.setItem(
				'allUsersContextValues',
				JSON.stringify(action.users)
			);
			return action.users;
		default:
			return state;
	}
};

export default allUserReducer;
