import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const DatePickerFilter = ({}) => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Grid style={{ marginBottom: 20, paddingLeft: 5 }}>
				<DatePicker
					label="Start Date"
					value={startDate}
					disablePast
					onChange={(newValue) => {
						setStartDate(newValue);
					}}
					maxDate={endDate}
					renderInput={(params) => <TextField {...params} />}
				/>
			</Grid>
			<Grid style={{ paddingLeft: 5 }}>
				<DatePicker
					minDate={startDate}
					disablePast
					label="End Date"
					value={endDate}
					onChange={(newValue) => {
						setEndDate(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
			</Grid>
		</LocalizationProvider>
	);
};
