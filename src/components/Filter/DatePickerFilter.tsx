import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const DatePickerFilter = ({
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	width = 12,
	disablePast = true,
}: {
	startDate: Date | null;
	setStartDate: any;
	endDate: Date | null;
	setEndDate: any;
	width?: any;
	disablePast?: boolean;
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Grid sm={width} item>
				<DatePicker
					label="Reservation Start Date"
					value={startDate}
					disablePast={disablePast}
					onChange={(newValue) => {
						setStartDate(newValue);
					}}
					clearable
					maxDate={endDate}
					renderInput={(params) => <TextField fullWidth {...params} />}
				/>
			</Grid>
			<Grid item sm={width}>
				<DatePicker
					minDate={startDate}
					disablePast={disablePast}
					label="Reservation End Date"
					value={endDate}
					clearable
					onChange={(newValue) => {
						setEndDate(newValue);
					}}
					renderInput={(params) => <TextField fullWidth {...params} />}
				/>
			</Grid>
		</LocalizationProvider>
	);
};
