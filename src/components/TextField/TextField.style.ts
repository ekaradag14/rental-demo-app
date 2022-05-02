import { makeStyles } from '@mui/styles';
import { BikyTheme } from '../../assets/theme';

export const useStyles = makeStyles((theme: BikyTheme) => ({
	cssLabel: {
		color: 'white',
	},
	notchedOutline: {
		borderWidth: '1px',
		borderColor: 'white!important',
	},
	cssOutlinedInput: {
		color: 'white',
		'&$cssFocused $notchedOutline': {
			borderColor: `${theme.palette.primary.main}!important`,
		},
	},
	colorSecondary: { color: 'white' },
	cssFocused: { color: `${theme.palette.primary.main}!important` },
	input: {
		'&:-webkit-autofill': {
			transition: 'background-color 5000s ease-in-out 0s',
			WebkitTextFillColor: '#fff !important',
		},
	},
}));
