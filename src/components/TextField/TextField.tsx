import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField as MuiTextField } from '@mui/material';
import { useState } from 'react';
import { useStyles } from './TextField.style';
import { TextFieldProps } from './TextField.types';

export const TextField = ({ name, type, ...rest }: TextFieldProps) => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<MuiTextField
			fullWidth
			variant="outlined"
			id={name}
			name={name}
			InputLabelProps={{
				classes: {
					root: classes.cssLabel,
					focused: classes.cssFocused,
				},
			}}
			InputProps={{
				classes: {
					input: classes.input,
					notchedOutline: classes.notchedOutline,
					focused: classes.cssFocused,
					root: classes.cssOutlinedInput,
				},
				endAdornment:
					type === 'password' ? (
						<InputAdornment position="end">
							<IconButton
								aria-label="Toggle password visibility"
								onClick={() => setShowPassword((prevShow) => !prevShow)}
								classes={{
									root: classes.colorSecondary,
								}}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					) : undefined,
			}}
			{...rest}
			type={showPassword ? 'text' : type}
		/>
	);
};
