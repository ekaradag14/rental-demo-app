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

		case 'REMOVE_BIKE':
			state = state.filter((bike: any) => bike.id !== action.id);
			localStorage.setItem('bikeContextValues', JSON.stringify(state));
			return state;

		case 'SET_BIKES':
			return action.bikes;
		default:
			return state;
	}
};

export default bikeReducer;
