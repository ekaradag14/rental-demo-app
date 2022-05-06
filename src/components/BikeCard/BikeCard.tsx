import { useState, useContext } from 'react';
import { useStyles } from './BikeCard.style';
import { BikeCardProps } from './BikeCard.types';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GetColorName } from 'hex-color-to-color-name';
import { RatingStars } from './RatingStars';
import { RentModal } from './RentModal';
import BikesContext from '../../contexts/bikes/context';
import UserContext from '../../contexts/user/context';
import { removeBikeReservationInContext } from '../../contexts/bikes/dispatchController';
import { removeReservationInContext } from '../../contexts/user/dispatchController';
import { shortenText } from '../../common/helper/utils';

export const BikeCard = ({
	id,
	model,
	color,
	location,
	rating,
	available,
	description,
	img,
	reservations,
	reservationId,
	setRenderKey,
}: BikeCardProps) => {
	const classes = useStyles();
	const { bikesDispatch } = useContext(BikesContext);
	const { userDispatch } = useContext(UserContext);
	const [isRentModalOpen, setIsRentModalOpen] = useState(false);
	const handleSubmit = () => {
		if (reservationId) {
			bikesDispatch(removeBikeReservationInContext(reservationId, id));
			userDispatch(removeReservationInContext(reservationId));
			setRenderKey((pS) => pS + 1);
		} else {
			setIsRentModalOpen(true);
		}
	};
	return (
		<Card className={classes.cardRoot}>
			<CardMedia component="img" height="140" image={img} alt="bike image" />
			<CardContent className={classes.cardContent}>
				<Grid key={rating} className={classes.modelTextContainer}>
					<Typography
						style={{ width: '100%' }}
						variant="subtitle1"
						component="div"
					>
						{shortenText(model, 15)}
					</Typography>
					<RatingStars id={id} rating={rating} />
				</Grid>

				<Typography variant="body2" color="text.secondary">
					{shortenText(description, 100)}
				</Typography>
				<Grid className={classes.contentFooterContainer}>
					<Grid className={classes.locationContainer}>
						<LocationOnIcon style={{ color: 'gray' }} />
						<Typography
							variant="body2"
							color="text.secondary"
							style={{ paddingLeft: 4 }}
						>
							{shortenText(location, 12)}
						</Typography>
					</Grid>
					<Grid className={classes.colorContainer}>
						<Typography
							variant="body2"
							color="text.secondary"
							style={{ paddingRight: 4 }}
						>
							{color && GetColorName(color)}
						</Typography>
						<Grid
							className={classes.colorPreviewBox}
							style={{
								backgroundColor: color,
							}}
						></Grid>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions style={{ marginTop: 'auto' }}>
				<Grid className={classes.cardActionsContainer}>
					<Button disabled={!available} onClick={handleSubmit} size="small">
						{available
							? reservationId
								? 'Cancel Reservation'
								: 'Rent'
							: 'Not Available'}
					</Button>
					<Checkbox
						disabled
						checked={available}
						style={{ marginLeft: 'auto' }}
					/>
				</Grid>
			</CardActions>
			<RentModal
				reservations={reservations}
				bike={{
					id,
					model,
					color,
					location,
					rating,
					available,
					description,
					img,
				}}
				open={isRentModalOpen}
				onClose={() => setIsRentModalOpen(false)}
			/>
		</Card>
	);
};
