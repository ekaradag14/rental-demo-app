import { useState, useRef, SyntheticEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
	Link,
	Button,
	Grid,
	CircularProgress,
	FormControlLabel,
	Checkbox,
} from '@mui/material';

// import { useAppDispatch } from '../../../common/redux/hooks';
// import { AuthActions } from '../../../user/contexts/AuthorizationSlice';
// import { loginAPI } from '../../../user/helper/userAPI';
import { TextField } from '..//TextField/TextField';
// import { CommonActions } from '../../../common/contexts/CommonSlice';
// import { alertMessages } from '../../../common/helper/alertMessages';
import { useStyles } from './Login.style';

export const Login = () => {
	const classes = useStyles();
	// const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(false);
	const [keepMeLogged, setKeepMeLogged] = useState(true);

	const emailRef = useRef({ value: '' });
	const passwordRef = useRef({ value: '' });

	// let handleSubmit = async (event: SyntheticEvent) => {
	// 	event.preventDefault();
	// 	setLoading(true);
	// 	if (window.screen.width < 700) {
	// 		dispatch(
	// 			CommonActions.createAlert(
	// 				alertMessages.CUSTOM_ERROR('No mobile entry.')
	// 			)
	// 		);
	// 		setLoading(false);
	// 		return;
	// 	}

	// 	const userData = {
	// 		email: emailRef.current.value,
	// 		password: passwordRef.current.value,
	// 		remember: keepMeLogged,
	// 	};

	// 	await loginAPI(userData)
	// 		.then((res) => {
	// 			if (res?.data?.data?.token && res?.data?.data?.userID) {
	// 				setTimeout(() => {
	// 					dispatch(AuthActions.setAuthData(res.data.data));
	// 				}, 2000);
	// 			} else {
	// 				dispatch(
	// 					CommonActions.createAlert(
	// 						alertMessages.CUSTOM_ERROR('Email or password incorrect.')
	// 					)
	// 				);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			if (err.response && err.response.status === 401) {
	// 				dispatch(
	// 					CommonActions.createAlert(
	// 						alertMessages.CUSTOM_ERROR('Email or password incorrect.')
	// 					)
	// 				);
	// 			} else {
	// 				dispatch(CommonActions.createAlert(alertMessages.SOMETHING_WRONG));
	// 			}
	// 		});

	// 	setLoading(false);
	// };

	return (
		<div>
			<form className={classes.form}>
				<Grid spacing={1} container>
					<Grid xs={12} item>
						<TextField
							fullWidth
							name="email"
							label="Email Address"
							autoComplete="email"
							inputRef={emailRef}
							margin="normal"
							required
						/>
					</Grid>
					<Grid xs={12} item>
						<TextField
							name="password"
							label="Password"
							type="password"
							autoComplete="current-password"
							inputRef={passwordRef}
							margin="normal"
							required
						/>
					</Grid>
					<Grid item sm={6} className={classes.checkPosition}>
						<FormControlLabel
							control={
								<Checkbox
									checked={keepMeLogged}
									onChange={() => setKeepMeLogged(!keepMeLogged)}
									name="keepMeLogged"
									style={{ color: 'white' }}
								/>
							}
							label="Keep Me Logged In"
							className={classes.check}
						/>
					</Grid>
					<Grid item sm={6} className={classes.forgot}>
						<Link
							to="/forgot-password"
							className={classes.link}
							variant="body2"
							component={RouterLink}
						>
							Forgot Password
						</Link>
					</Grid>
					<Grid xs={12} item>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={loading}
							color="primary"
							className="submit"
						>
							Sign In
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
						</Button>
					</Grid>
					<Grid item style={{ margin: 'auto' }}>
						<Link
							to="/signup"
							className={classes.link}
							variant="body2"
							component={RouterLink}
						>
							Don't have an account? Sign Up
						</Link>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};
