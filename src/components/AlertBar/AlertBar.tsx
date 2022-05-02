import { Grid, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from 'react';
import { useStyles } from './AlertBar.style';
import { AlertBarProps } from './AlertBar.types';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AlertBar = ({
	isOpen,
	severity,
	message,
	autoHideDuration = 4000,
	alertClear,
}: AlertBarProps) => {
	const classes = useStyles();

	return (
		<Grid className={classes.root}>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={isOpen}
				onClose={() => {
					setTimeout(() => alertClear(), 170);
				}}
				autoHideDuration={autoHideDuration}
			>
				<Alert
					//@ts-ignore
					className={classes[severity]}
					onClose={() => {
						setTimeout(() => alertClear(), 170);
					}}
					severity={severity}
				>
					{message}
				</Alert>
			</Snackbar>
		</Grid>
	);
};
