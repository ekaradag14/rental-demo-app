import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	notchedOutline: {
		borderWidth: '1px',
		borderColor: 'white !important',
	},
	form: {
		width: '100% + 30px',
		marginTop: 8,
		maxWidth: '30vw',
		minWidth: 250,
	},
	progress: {
		position: 'absolute',
	},
	link: {
		cursor: 'pointer',
		color: 'white',
		marginTop: '5rem',
	},
	checkPosition: {
		paddingTop: 0,
		paddingBottom: 0,
		marginTop: -10,
	},
	forgot: {
		textAlign: 'right',
	},
	check: { color: 'white' },
}));
