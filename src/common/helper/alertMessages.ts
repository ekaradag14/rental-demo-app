export const alertMessages = {
	UNAUTHORIZED: {
		isOpen: true,
		message: 'You are unauthorized, please login again to terminate your process.',
		severity: 'error',
	},
	LIMIT_OVERFLOW: {
		isOpen: true,
		message: 'Your usage limit has been reached.',
		severity: 'error',
	},
	SUCCESSFUL_SAVE: {
		isOpen: true,
		message: `Item saved successfully.`,
		severity: 'success',
	},
	SUCCESSFUL_DELETE: {
		isOpen: true,
		message: 'Item deleted successfully.',
		severity: 'success',
	},
	SUCCESSFUL_RELOAD: {
		isOpen: true,
		message: 'Item reload successfully.',
		severity: 'success',
	},
	SOMETHING_WRONG: {
		isOpen: true,
		message: 'Something has gone wrong, please try again.',
		severity: 'error',
	},
	SUCCESSFUL_SELECT: {
		isOpen: true,
		message: 'Text selected successfully',
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
