import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	noReservationText: {
		margin: 10,
		color: 'gray',
		fontStyle: 'italic',
	},
}));
