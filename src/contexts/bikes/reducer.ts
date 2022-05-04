const bikeReducer = (state: any, action: any) => {
	switch (action.type) {
		case 'ADD_BIKE':
			state = [
				{
					...action.bike,
				},
				...state,
			];
			localStorage.setItem('bikeContextValues', JSON.stringify(state));
			return state;
		case 'UPDATE_BIKE':
			state.find((bike: any, index: number) => {
				if (bike.id === action.bike.id) {
					state[index] = action.bike;
					return true;
				}
			});
			localStorage.setItem('bikeContextValues', JSON.stringify(state));
			return state;
		case 'ADD_RESERVATION':
			state.find((bike: any, index: number) => {
				if (bike.id === action.bikeId) {
					state[index].reservations.push(action.reservation);
					return true;
				}
			});
			localStorage.setItem('bikeContextValues', JSON.stringify(state));
			return state;
		case 'REMOVE_RESERVATION':
			state.find((bike: any, index: number) => {
				if (bike.id === action.bikeId) {
					state[index].reservations = state[index].reservations.filter(
						(reservation) => reservation.reservationId !== action.reservationId
					);
					return true;
				}
			});
			localStorage.setItem('bikeContextValues', JSON.stringify(state));
			return state;
		case 'REMOVE_BIKES':
			state = state.filter((bike: any) => !action.ids.includes(bike.id));
			localStorage.setItem('bikeContextValues', JSON.stringify(state));
			return state;

		case 'SET_BIKES':
			localStorage.setItem('bikeContextValues', JSON.stringify(state));
			return action.bikes;
		default:
			return state;
	}
};

export default bikeReducer;
