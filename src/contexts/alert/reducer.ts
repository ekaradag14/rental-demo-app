const alertReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'SET_ALERT':
			return { isOpen: true, ...action.alert };
		case 'CLEAR_ALERT':
			return { isOpen: false, message: '' };
		default:
			return state;
	}
};

export default alertReducer;
