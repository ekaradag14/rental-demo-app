import { useState } from 'react';
import { useStyles } from './Cover.style';
// import { CoverProps } from '../Cover.types
import { Grid } from '@mui/material';

export const Cover = () => {
	const classes = useStyles();
	return (
		<Grid justifyContent="center" className={classes.base}>
			<h2 className={classes.title}>Upgrade your next track</h2>
			<p className={classes.subtitle}>
				The time is now for it be okay to be great. People in this world shun
				people for being nice.
			</p>
		</Grid>
	);
};
