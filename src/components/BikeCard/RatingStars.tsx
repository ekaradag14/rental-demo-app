import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export const RatingStars = ({
	rating,
	marginLeft = 'auto',
}: {
	rating: number;
	marginLeft?: string;
}) => {
	const [value, setValue] = useState<number | null>(rating);
	const [hover, setHover] = useState(-1);

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
			}}
		>
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
