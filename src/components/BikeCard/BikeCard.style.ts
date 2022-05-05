import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	locationContainer: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 8,
		alignContent: 'center',
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
	},
	contentFooterContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	modelTextContainer: { display: 'flex', flexDirection: 'row' },
	ratingStartsContainer: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
}));
