const userReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'SET_USER':
			localStorage.setItem('userContextValue', JSON.stringify(action.user));
			return action.user;
		default:
			return state;
	}
};

export default userReducer;
