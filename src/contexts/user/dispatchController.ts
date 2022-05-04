export const setUser = (user: any) => ({
	type: 'SET_USER',
	user,
});
export const addReservationToUser = (reservation: any) => ({
	type: 'ADD_RESERVATION',
	reservation,
});

export const removeReservationInContext = (reservationId: string) => ({
	type: 'REMOVE_RESERVATION',
	reservationId,
});
