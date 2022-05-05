import * as React from 'react';
import { Box, Grid } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

export function RatingFilter({ ratingData, setRatingData, onChangeCommitted }) {
	const handleChange = (event: Event, newValue: number | number[]) => {
		setRatingData(newValue as number[]);
	};

	return (
		<Box
			sx={{
				width: '100%',
				paddingLeft: 2,
				paddingTop: 2,
				overflowX: 'hidden',
			}}
		>
			<Typography color="primary">Rating</Typography>
			<Grid style={{ margin: 'auto', width: '100%' }}>
				<Slider
					getAriaLabel={() => 'Temperature range'}
					value={ratingData}
					style={{ width: '85%' }}
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
