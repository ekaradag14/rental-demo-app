export const alertMessages = {
	UNAUTHORIZED: {
		isOpen: true,
		message:
			'You are unauthorized, please login again to terminate your process.',
		severity: 'warning',
	},
	INVALID_CREDENTIALS: {
		isOpen: true,
		message: 'No matching email and password.',
		severity: 'warning',
	},
	SUCCESSFUL_SAVE: {
		isOpen: true,
		message: `Item saved successfully.`,
		severity: 'success',
	},
	SUCCESSFUL_RENT: {
		isOpen: true,
		message: `Bike rented successfully.`,
		severity: 'success',
	},
	SUCCESSFUL_CANCEL: {
		isOpen: true,
		message: 'Bike reservation cancelled successfully.',
		severity: 'success',
	},
	SOMETHING_WRONG: {
		isOpen: true,
		message: 'Something has gone wrong, please try again.',
		severity: 'error',
	},
	SUCCESSFUL_DELETE: {
		isOpen: true,
		message: 'Item(s) deleted successfully',
		severity: 'success',
	},
	CUSTOM_ERROR: (message: string) => ({
		isOpen: true,
		message: message,
		severity: 'error',
	}),
	CUSTOM_SUCCESS: (message: string) => ({
		isOpen: true,
		message: message,
		severity: 'success',
	}),
};
