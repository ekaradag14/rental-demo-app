import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useStyles } from './BikeCard.style';

export const RatingStars = ({
	rating,
	marginLeft = 'auto',
}: {
	rating: number;
	marginLeft?: string;
}) => {
	const classes = useStyles();
	const [value, setValue] = useState<number | null>(rating);
	const [hover, setHover] = useState(-1);

	return (
		<Box className={classes.ratingStartsContainer}>
			<Rating
				style={{ marginLeft }}
				name="hover-feedback"
				value={value}
				precision={0.2}
				readOnly
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
				emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
			/>
		</Box>
	);
};
