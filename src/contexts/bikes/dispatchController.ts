export const addBikeToContext = (bike: any) => ({
	type: 'ADD_BIKE',
	bike,
});
export const deleteBikeFromContext = (id: string) => ({
	type: 'REMOVE_BIKE',
	id,
});
export const setBikesToContext = (bikes: any) => ({
	type: 'SET_BIKES',
	bikes: bikes,
});
export const updateBikeInContext = (bike: any) => ({
	type: 'UPDATE_BIKE',
	bike,
});
