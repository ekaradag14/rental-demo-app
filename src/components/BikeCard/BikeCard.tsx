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
	//@ts-ignore
	const { bikes, bikesDispatch } = useContext(BikesContext);
	const { user, userDispatch } = useContext(UserContext);
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
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia component="img" height="140" image={img} alt="green iguana" />
			<CardContent style={{ paddingBottom: 0 }}>
				<Grid style={{ display: 'flex', flexDirection: 'row' }}>
					<Typography
						style={{ width: '100%' }}
						variant="subtitle1"
						component="div"
					>
						{model}
					</Typography>
					<RatingStars rating={rating} />
				</Grid>

				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
				<Grid
					style={{
						display: 'flex',
						flexDirection: 'row',
						width: '100%',
					}}
				>
					<Grid
						style={{
							display: 'flex',
							flexDirection: 'row',
							paddingTop: 8,
							alignContent: 'center',
						}}
					>
						<LocationOnIcon style={{ color: 'gray' }} />
						<Typography
							variant="body2"
							color="text.secondary"
							style={{ paddingLeft: 4 }}
						>
							{location}
						</Typography>
					</Grid>
					<Grid
						style={{
							display: 'flex',
							flexDirection: 'row',
							paddingTop: 8,
							alignContent: 'center',
							marginLeft: 'auto',
						}}
					>
						<Typography
							variant="body2"
							color="text.secondary"
							style={{ paddingRight: 4 }}
						>
							{GetColorName(color)}
						</Typography>
						<Grid
							style={{
								backgroundColor: color,
								width: 20,
								height: 20,
								borderRadius: 20,
							}}
						></Grid>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Grid style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
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
