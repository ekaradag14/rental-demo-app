import { useState, useEffect, useContext } from 'react';
import { useStyles } from './UserForm.style';
import { UserFormProps } from './UserForm.types';
import { useForm, Form } from '../../common/hooks/useForm';
import {
	Checkbox,
	Grid,
	TextField,
	FormControlLabel,
	Button,
} from '@mui/material';
import AllUserContext from '../../contexts/allUsers/context';
import { emailRegEx } from '../SignUp/SignUp';
import {
	addUserToContext,
	updateUserInContext,
} from '../../contexts/allUsers/dispatchController';
import { generateRandomID } from '../../common/helper/utils';
const initialFValues = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	role: '',
};
var CryptoJS = require('crypto-js');

export const UserForm = ({
	close,
	initialUser,
	isCreatingManager,
}: UserFormProps) => {
	const classes = useStyles();
	const [isManager, setIsManager] = useState(
		initialUser?.role === 'manager' || isCreatingManager
	);
	const { allUsers, allUsersDispatch } = useContext(AllUserContext);
	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ('firstName' in fieldValues)
			temp.firstName = fieldValues.firstName ? '' : 'First name is required.';
		if ('lastName' in fieldValues)
			temp.lastName = fieldValues.lastName ? '' : 'Last name is required.';
		if ('email' in fieldValues) {
			temp.email = emailRegEx.test(fieldValues.email)
				? allUsers.filter((el) => el.email === fieldValues.email).length &&
				  !initialUser
					? 'There is already an account with this email.'
					: ''
				: 'Please insert a valid email';
		}

		if ('password' in fieldValues)
			temp.password = fieldValues.password
				? fieldValues.password.length < 6
					? 'Password should be min 6 characters'
					: ''
				: 'Password is required.';
		setErrors({
			...temp,
		});

		if (fieldValues == values) return Object.values(temp).every((x) => x == '');
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (validate()) {
			if (initialUser) {
				if (isManager) {
					values.role = 'manager';
				} else {
					values.role = 'user';
				}
				allUsersDispatch(updateUserInContext(values));
			} else {
				const newUserData = {
					...values,
					id: generateRandomID(),
					email: values.email.trim(),
					password: CryptoJS.AES.encrypt(
						values.password,
						values.email.trim()
					).toString(),
					role: isManager ? 'manager' : 'user',
					reservations: [],
				};

				allUsersDispatch(addUserToContext(newUserData));
			}

			close();
		}
	};
	const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
		useForm(initialFValues, true, validate);
	useEffect(() => {
		if (initialUser) {
			setValues(initialUser);
		}
	}, []);
	return (
		<Form onSubmit={handleSubmit}>
			<Grid container style={{ padding: 10 }}>
				<Grid
					container
					item
					sm={12}
					spacing={3}
					style={{ padding: 10, display: 'flex', flexDirection: 'row' }}
				>
					{formFields.map((el) => (
						<Grid item sm={12} key={el.label}>
							<TextField
								fullWidth
								name={el.name}
								label={el.label}
								variant="outlined"
								disabled={initialUser && el.name === 'password'}
								value={
									initialUser && el.name === 'password' ? '' : values[el.name]
								}
								onChange={handleInputChange}
								helperText={errors[el.name]}
								error={!!errors[el.name]}
							/>
						</Grid>
					))}
					<Grid item sm={12}>
						<FormControlLabel
							style={{ paddingLeft: 10 }}
							label="Manager"
							control={
								<Checkbox
									checked={isManager}
									onChange={(e) => {
										//@ts-ignore
										setIsManager(e.target.checked);
									}}
								/>
							}
						/>
						<Grid
							container
							item
							xs={12}
							style={{
								display: 'flex',
								alignItems: 'center',
								paddingBottom: 20,
							}}
						>
							<Grid
								item
								sm={6}
								style={{
									display: 'flex',
									alignItems: 'center',
									margin: 'auto',
								}}
							>
								<Button
									style={{ width: '50%', margin: 'auto' }}
									variant="contained"
									type="submit"
								>
									Submit
								</Button>
							</Grid>
							<Grid
								item
								sm={6}
								style={{ display: 'flex', alignItems: 'center' }}
							>
								<Button
									style={{ width: '50%', margin: 'auto' }}
									variant="contained"
									color="secondary"
									onClick={resetForm}
								>
									Reset
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Form>
	);
};
const formFields = [
	{ label: 'First Name', name: 'firstName' },
	{ label: 'Last Name', name: 'lastName' },
	{ label: 'Email', name: 'email' },
	{ label: 'Password', name: 'password' },
];
