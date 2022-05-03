import { useState } from 'react';
import { useStyles } from './SearchDrawer.style';
// import { SearchDrawerProps } from './SearchDrawer.types';

import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { CheckboxGroupFilter } from '../Filter/CheckboxGrupFilter';
import { DatePickerFilter } from '../Filter/DatePickerFilter';
const drawerWidth = 240;

export const SearchDrawer = ({}) => {
	const classes = useStyles();
	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
			}}
			variant="permanent"
			anchor="left"
		>
			<Grid sx={{ paddingTop: 10 }} />
			<DatePickerFilter />
			<CheckboxGroupFilter
				data={[
					{ label: 'Gallardo' },
					{ label: 'Lambardo' },
					{ label: 'Ambargo' },
					{ label: 'Ambargo2' },
					{ label: 'Ambargo3' },
					{ label: 'Ambargo4' },
				]}
				title={'Model'}
			/>
			<CheckboxGroupFilter
				data={[
					{ label: 'Black' },
					{ label: 'Yellow' },
					{ label: 'Green' },
					{ label: 'Red' },
					{ label: 'Blue' },
				]}
				title={'Color'}
			/>
			<CheckboxGroupFilter
				data={[
					{ label: 'Gallardo' },
					{ label: 'Lambardo' },
					{ label: 'Ambargo' },
					{ label: 'Ambargo2' },
					{ label: 'Ambargo3' },
					{ label: 'Ambargo4' },
				]}
				title={'Location'}
			/>

			<Divider />
		</Drawer>
	);
};
