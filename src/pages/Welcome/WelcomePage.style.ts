import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	image: {
		width: '100vw',
		minWidth: 1600,
		minHeight: 900,
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		overflow: 'hidden',
		position: 'fixed',
		zIndex: -1,
	},
	formBlock: {
		display: 'flex',
		alignItems: 'center',
		margin: 0,
		padding: 0,
		maxWidth: 'none',
		overflow: 'hidden',
		flexDirection: 'column',
	},
	paper: {
		background:
			'linear-gradient(0deg, rgba(0,0,0,0.05) 5%,rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.2) 90%,rgba(0,0,0,0.05) 95%);',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
	},
	avatar: {
		width: 250,
		height: 150,
	},
}));
