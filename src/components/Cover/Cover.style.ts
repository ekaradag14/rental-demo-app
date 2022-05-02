import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	base: {
		borderRadius: 10,
		background:
			'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1570679334008-c97544c8695b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2458&q=80")',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: 400,
		width: '100%',
		overflow: 'hidden',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		textAlign: 'center',
	},
	title: {
		color: 'white',
		fontFamily: 'Roboto, sans-serif',
		fontSize: '2.25rem',
		lineHeight: 1,
		fontWeight: 700,
	},
	subtitle: {
		color: 'white',
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
		fontSize: '1.25rem',
		fontWeight: 400,
		lineHeight: 1.625,
	},
}));
