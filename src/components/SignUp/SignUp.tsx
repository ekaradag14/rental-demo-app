import { Button, CircularProgress, Grid, Link } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TextField } from '../TextField/TextField';
// import { CommonActions } from '../../../common/contexts/CommonSlice';
import { alertMessages } from '../../common/helper/alertMessages';
// import { useAppDispatch } from '../../../common/redux/hooks';
// import { AuthActions } from '../../../user/contexts/AuthorizationSlice';
// import { loginAPI, signupAPI } from '../../../user/helper/userAPI';
import { useStyles } from './SignUp.style';
import UserContext from '../../contexts/user/context';
import { setUser } from '../../contexts/user/dispatchController';
var CryptoJS = require('crypto-js');
export const emailRegEx =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SignUp = () => {
	const classes = useStyles();
	// const dispatch = useAppDispatch();
	//@ts-ignore
	const { user, userDispatch } = useContext(UserContext);
	const [errors, setErrors] = useState<any>(emptyError);
	const [loading, setLoading] = useState(false);
	const [formValues, setFormValues] = useState(emptyData);

	const isMobileBrowser = window.screen.width < 700;

	let handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setErrors(emptyError);
		setFormValues({ ...formValues, [event.target.name]: event.target.value });
	};

	let handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		setLoading(true);

		if (!formValues.email.match(emailRegEx)) {
			setErrors({ ...errors, email: 'Please enter a valid email.' });
			setLoading(false);
			return;
		} else if (formValues.password.length < 6) {
			setErrors({
				...errors,
				password: 'Password must be at least 6 characters.',
			});
			setLoading(false);
			return;
		}

		const newUserData = {
			...formValues,
			email: formValues.email.trim(),
			password: CryptoJS.AES.encrypt(
				formValues.password,
				formValues.email.trim()
			).toString(),
			role: 'user',
			reservations: [],
		};
		userDispatch(setUser(newUserData));
		setLoading(false);
	};

	return (
		<div>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Grid container spacing={isMobileBrowser ? 1 : 2}>
					<Grid xs={12} item sm={6}>
						<TextField
							id="firstName"
							label="First Name"
							name="firstName"
							autoComplete="given-name"
							helperText={errors.firstName}
							error={errors.firstName ? true : false}
							value={formValues.firstName}
							onChange={handleChange}
						/>
					</Grid>
					<Grid xs={12} item sm={6}>
						<TextField
							id="lastName"
							label="Last Name"
							name="lastName"
							autoComplete="family-name"
							helperText={errors.lastName}
							error={errors.lastName ? true : false}
							value={formValues.lastName}
							onChange={handleChange}
						/>
					</Grid>
					<Grid xs={12} item>
						<TextField
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							helperText={errors.email}
							error={errors.email ? true : false}
							value={formValues.email}
							onChange={handleChange}
						/>
					</Grid>
					<Grid xs={12} item>
						<TextField
							name="password"
							label="Password"
							type={'password'}
							autoComplete="new-password"
							helperText={errors.password}
							error={errors.password ? true : false}
							value={formValues.password}
							onChange={handleChange}
							required
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					disabled={loading}
					className={classes.submit}
				>
					Sign Up
					{loading && (
						<CircularProgress size={30} className={classes.progress} />
					)}
				</Button>
				<Grid container justifyContent="center">
					<Grid
						item
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Link
							to="/login"
							style={{ cursor: 'pointer', color: 'white' }}
							variant="body2"
							component={RouterLink}
						>
							Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

const emptyError = {
	firstName: null,
	lastName: null,
	email: null,
	password: null,
};

const emptyData = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
};
