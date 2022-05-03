const userReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'SET_USER':
			return action.user;
		default:
			return state;
	}
};

export default userReducer;
