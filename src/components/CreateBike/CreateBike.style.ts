import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	dropzoneContainer: {
		padding: 10,
		marginLeft: 'auto',
		display: 'flex',
		flexDirection: 'row',
		maxHeight: 350,
	},
	formFieldsContainer: {
		padding: 10,
		display: 'flex',
		flexDirection: 'row',
	},
	resetFormButtonContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	submitFormButtonContainer: {
		display: 'flex',
		alignItems: 'center',
		margin: 'auto',
	},
	formButton: {
		width: '50%',
		margin: 'auto',
	},
	buttonContainer: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: 20,
	},
	errorText: {
		color: 'red',
		margin: 10,
		marginLeft: 22,
	},
}));
