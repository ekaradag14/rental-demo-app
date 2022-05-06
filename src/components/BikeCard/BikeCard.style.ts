import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	cardRoot: {
		maxWidth: 345,
		height: 330,
		display: 'flex',
		flexDirection: 'column',
	},
	locationContainer: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 8,
		alignContent: 'center',
	},
	cardContent: {
		paddingBottom: 0,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
	},
	colorContainer: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 8,
		alignContent: 'center',
		marginLeft: 'auto',
	},
	colorPreviewBox: {
		width: 20,
		height: 20,
		borderRadius: 20,
	},
	cardActionsContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		marginTop: 'auto',
	},
	contentFooterContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		marginTop: 'auto',
	},
	modelTextContainer: { display: 'flex', flexDirection: 'row' },
	ratingStartsContainer: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
}));
