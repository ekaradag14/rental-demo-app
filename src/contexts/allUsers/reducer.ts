const allUserReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'SET_ALL_USER':
			return action.users;
		default:
			return state;
	}
};

export default allUserReducer;
