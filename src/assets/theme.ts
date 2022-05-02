import { Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export type BikyColors = {
	blue: string;
	yellow: string;
	red: string;
	gray1: string;
	gray2: string;
	O500: string;
	drawerWidth: number;
	minHeight: number;
	sideMenu: string;
	sideMenuSelected: string;
	secondaryBiky: string;
	primaryMain: string;
	borderColor: string;
	info_500: string;
	smallButtonBorderRadius: number;
};

export interface BikyTheme extends Theme {
	biky: BikyColors;
}

const mainTheme = createTheme({
	mixins: {},
	components: {},
	palette: {},
	transitions: {},
	typography: {},
});

const theme: BikyTheme = {
	...mainTheme,
	palette: {
		...mainTheme.palette,
		secondary: {
			...mainTheme.palette.secondary,
			main: '#D0D0D0',
			light: '#D0D0D0',
			dark: '#D0D0D0',
		},
	},
	biky: {
		red: '#ff4444',
		yellow: '#ffbd3f',
		blue: '#5990ff',
		gray1: '#F6F6F6',
		gray2: '#6A6A6A',
		O500: '#5990ffcc',
		drawerWidth: 57,
		sideMenu:
			'linear-gradient(180deg, rgba(183, 200, 215, 0.46) 0%, rgba(183, 200, 215, 0.13) 111.2%)',
		minHeight: 0,
		sideMenuSelected: 'rgba(139, 170, 198, 0,5)',
		secondaryBiky: '#ffbd3f',
		primaryMain: '#5990FF',
		borderColor: '#D0D0D0',
		info_500: '#a1dffb',
		smallButtonBorderRadius: 10,
	},
};

export default theme;
