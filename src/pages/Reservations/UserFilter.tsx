import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { UserProps } from '../../common/types';

export const UserFilter = ({ users }: { users: UserProps[] }) => {
	return (
		<Autocomplete
			multiple
			id="tags-outlined"
			options={users}
			getOptionLabel={(option: UserProps) =>
				`${option.firstName} ${option.lastName}`
			}
			filterSelectedOptions
			renderInput={(params) => <TextField {...params} placeholder="Users" />}
		/>
	);
};
