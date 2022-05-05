import { useState, useContext, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useStyles } from './BikeCard.style';
import BikesContext from '../../contexts/bikes/context';
import { rateBikeInContext } from '../../contexts/bikes/dispatchController';
export const RatingStars = ({
	id,
	rating,
	marginLeft = 'auto',
}: {
	id: string;
	rating: number;
	marginLeft?: string;
}) => {
	const classes = useStyles();
	const [hover, setHover] = useState(-1);
	const [localRating, setLocalRating] = useState(rating);
	const { bikesDispatch } = useContext(BikesContext);
	const rateBike = (newRating) => {
		setLocalRating(newRating);
		bikesDispatch(rateBikeInContext(id, newRating));
	};

	return (
		<Box className={classes.ratingStartsContainer}>
			<Rating
				style={{ marginLeft }}
				name="hover-feedback"
				value={localRating}
				precision={0.2}
				onChange={(event, newValue) => {
					rateBike(newValue);
				}}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
				emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
			/>
		</Box>
	);
};
