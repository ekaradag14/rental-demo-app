import { useState } from 'react';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export const CheckboxGroupFilter = ({
	title,
	data,
}: {
	title: string;
	data: { label: string }[];
}) => {
	return (
		<>
			<Typography style={{ padding: 15 }}>{title}</Typography>
			<Divider />
			<FormGroup
				sx={{
					maxHeight: 150,
					paddingLeft: 2.5,
					display: 'flex',
					flexDirection: 'column',
					overflowX: 'auto',
				}}
			>
				<Grid container>
					{data.map((el) => (
						<Grid key={el.label} item sm={12}>
							<FormControlLabel control={<Checkbox />} label={el.label} />
						</Grid>
					))}
				</Grid>
			</FormGroup>
			<Divider />
		</>
	);
};
