export const addBikeToContext = (bike: any) => ({
	type: 'ADD_BIKE',
	bike,
});
export const deleteBikesFromContext = (ids: string[]) => ({
	type: 'REMOVE_BIKES',
	ids,
});
export const setBikesToContext = (bikes: any) => ({
	type: 'SET_BIKES',
	bikes: bikes,
});
export const updateBikeInContext = (bike: any) => ({
	type: 'UPDATE_BIKE',
	bike,
});
