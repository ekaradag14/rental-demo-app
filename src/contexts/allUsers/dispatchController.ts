export const setAllUser = (users: any) => ({
	type: 'SET_ALL_USER',
	users,
});
export const addUserToContext = (user: any) => ({
	type: 'ADD_USER',
	user,
});
export const updateUserInContext = (user: any) => ({
	type: 'UPDATE_USER',
	user,
});
export const deleteUsersFromContext = (ids: string[]) => ({
	type: 'REMOVE_USERS',
	ids,
});
