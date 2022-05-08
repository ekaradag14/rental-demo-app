import { useState, useRef, SyntheticEvent, useContext } from 'react';
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
import AllUserContext from '../../contexts/allUsers/context';

import AlertContext from '../../contexts/alert/context';
import { setAlert } from '../../contexts/alert/dispatchController';

import UserContext from '../../contexts/user/context';
import { setUser } from '../../contexts/user/dispatchController';
import { UserProps } from '../../common/types';
import { alertMessages } from '../../common/helper/alertMessages';
var CryptoJS = require('crypto-js');
export const Login = () => {
	const classes = useStyles();

	const { user, userDispatch } = useContext(UserContext);
	const { allUsers } = useContext(AllUserContext);
	const { alertDispatch } = useContext(AlertContext);
	const [loading, setLoading] = useState(false);

	const emailRef = useRef({ value: '' });
	const passwordRef = useRef({ value: '' });

	let handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);

		const userData = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};

		let isValidUser = null;
		allUsers.forEach((el: UserProps) => {
			if (
				el.email === userData.email &&
				CryptoJS.AES.decrypt(el.password, el.email).toString(
					CryptoJS.enc.Utf8
				) === userData.password
			) {
				isValidUser = el;
			}
		});
		if (isValidUser) {
			userDispatch(setUser(isValidUser));
		} else {
			alertDispatch(setAlert(alertMessages.INVALID_CREDENTIALS));
		}

		setLoading(false);
	};

	return (
		<div>
			<form className={classes.form} onSubmit={handleSubmit}>
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
