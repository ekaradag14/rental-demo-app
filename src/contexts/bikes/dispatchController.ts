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
export const rateBikeInContext = (bikeId: string, rating: string) => ({
	type: 'RATE_BIKE',
	bikeId,
	rating,
});
export const addBikeReservationInContext = (
	reservation: any,
	bikeId: string
) => ({
	type: 'ADD_RESERVATION',
	reservation,
	bikeId,
});
export const removeBikeReservationInContext = (
	reservationId: string,
	bikeId: string
) => ({
	type: 'REMOVE_RESERVATION',
	reservationId,
	bikeId,
});
