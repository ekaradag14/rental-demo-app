import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	success: {
		backgroundColor: 'success',
		minWidth: 250,
	},
	info: {
		backgroundColor: 'info',
		minWidth: 250,
	},
	error: {
		backgroundColor: 'error',
		minWidth: 250,
	},
	warning: {
		backgroundColor: 'warning',
		minWidth: 250,
	},
	root: {
		position: 'absolute',
		zIndex: 5000,
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));
