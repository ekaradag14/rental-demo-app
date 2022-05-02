module.exports = {
	overrides: {
		MuiDropzoneArea: {
			icon: { marginTop: 20, color: 'gray' },
			root: {
				maxWidth: 720,
				minHeight: 200,
				marginTop: 23,
				justifyContent: 'center',
			},
			textContainer: {
				height: 45,
				marginTop: 40,
			},

			text: {
				color: 'gray',
				fontWeight: 'bold',
			},
		},
		MuiDropzonePreviewList: {
			root: {
				alignSelf: 'center',
				justifyContent: 'center',
			},
			imageContainer: {
				maxWidth: 'none',
				maxHeight: 350,
				justifyContent: 'center',
				padding: 0,
			},
		},
		MuiDropzoneSnackbar: {
			errorAlert: {
				backgroundColor: '#FAA',
				color: '#000',
			},
			infoAlert: {
				backgroundColor: '#a1dffb',
				color: '#000',
			},
			successAlert: {
				backgroundColor: '#bad072',
				color: '#000',
			},
		},
	},
};
