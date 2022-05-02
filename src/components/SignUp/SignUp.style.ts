import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
		maxWidth: '30vw',
		minWidth: 300,
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	progress: {
		position: 'absolute',
	},
}));
