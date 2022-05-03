import { useState } from 'react';
import { useStyles } from './SearchDrawer.style';
// import { SearchDrawerProps } from './SearchDrawer.types';

import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { CheckboxGroupFilter } from '../Filter/CheckboxGrupFilter';
import { DatePickerFilter } from '../Filter/DatePickerFilter';
const drawerWidth = 240;

export const SearchDrawer = ({
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	modelData,
	setModelData,
	locationData,
	setLocationData,
	colorData,
	setColorData,
}: {
	startDate: Date | null;
	setStartDate: any;
	endDate: Date | null;
	setEndDate: any;
	modelData: { label: string; checked: boolean }[];
	setModelData: any;
	locationData: { label: string; checked: boolean }[];
	setLocationData: any;
	colorData: { label: string; checked: boolean }[];
	setColorData: any;
}) => {
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
			<DatePickerFilter
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
			/>
			<CheckboxGroupFilter
				data={modelData}
				setData={setModelData}
				title={'Model'}
			/>
			<CheckboxGroupFilter
				data={locationData}
				setData={setLocationData}
				title={'Location'}
			/>
			<CheckboxGroupFilter
				isColor
				data={colorData}
				setData={setColorData}
				title={'Color'}
			/>
			<Divider />
		</Drawer>
	);
};
