const userReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'SET_USER':
			localStorage.setItem('userContextValue', JSON.stringify(action.user));
			return action.user;
		case 'REMOVE_RESERVATION':
			state.reservations = state.reservations.filter(
				(reservation) => reservation.reservationId !== action.reservationId
			);
			localStorage.setItem('userContextValue', JSON.stringify(state));
			return state;
		case 'ADD_RESERVATION':
			state.reservations.push(action.reservation);
			localStorage.setItem('userContextValue', JSON.stringify(state));
			return state;
		default:
			return state;
	}
};

export default userReducer;
