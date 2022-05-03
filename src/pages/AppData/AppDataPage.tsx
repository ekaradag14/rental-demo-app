import { useState, useEffect } from 'react';

import { Grid } from '@mui/material';

import { useStyles } from './AppDataPage.style';
import SimpleDialogDemo from './ViewDialog';
export const AppDataPage = (props: any) => {
	const classes = useStyles();

	return (
		<Grid>
			AppData
			<SimpleDialogDemo />
		</Grid>
	);
};
