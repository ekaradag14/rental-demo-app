import * as React from 'react';
import { Box, Grid } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

export function RatingFilter({ ratingData, setRatingData, onChangeCommitted }) {
	const handleChange = (event: Event, newValue: number | number[]) => {
		setRatingData(newValue as number[]);
	};

	return (
		<Box sx={{ width: 220, paddingLeft: 2, paddingTop: 2 }}>
			<Typography>Rating</Typography>
			<Grid style={{ margin: 'auto' }}>
				<Slider
					getAriaLabel={() => 'Temperature range'}
					value={ratingData}
					max={5}
					marks
					onChangeCommitted={onChangeCommitted}
					step={0.2}
					onChange={handleChange}
					valueLabelDisplay="auto"
				/>
			</Grid>
		</Box>
	);
}
