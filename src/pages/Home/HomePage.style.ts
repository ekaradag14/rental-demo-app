import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	noReservationText: {
		marginTop: 60,
		marginLeft: 150,
		color: 'gray',
		fontStyle: 'italic',
	},
	dateRangeText: { color: 'gray', marginLeft: 20 },
	upcomingBookingsText: { color: 'gray', marginTop: 10 },
}));
