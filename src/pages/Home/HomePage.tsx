import { useState, useEffect, useContext } from 'react';

import { Grid, Typography } from '@mui/material';
import { Cover } from '../../components/Cover/Cover';
import { BikeCard } from '../../components/BikeCard/BikeCard';

import { useStyles } from './HomePage.style';
import { BikeProps } from '../../common/types';

import BikesContext from '../../contexts/bikes/context';
import UserContext from '../../contexts/user/context';

export const HomePage = (props: any) => {
	const classes = useStyles();
	const [renderKey, setRenderKey] = useState(0);
	//@ts-ignore
	const { bikes } = useContext(BikesContext);
	const { user } = useContext(UserContext);
	return (
		<Grid>
			<Grid style={{ padding: 10 }}>
				<Cover />
				<Typography variant="h3" className={classes.upcomingBookingsText}>
					Your Upcoming Bookings
				</Typography>
				<Grid container key={renderKey} spacing={4} marginTop={1}>
					{user.reservations.length ? (
						user.reservations.map((reservation) => {
							const bike: BikeProps = bikes.find(
								(el: BikeProps) => el.id === reservation.bikeId
							);
							return (
								<Grid
									key={reservation.reservationId}
									item
									xs={12}
									sm={6}
									md={4}
									lg={3}
								>
									<BikeCard
										{...bike}
										reservationId={reservation.reservationId}
										setRenderKey={setRenderKey}
									/>
									<Typography variant="h4" className={classes.dateRangeText}>
										{new Date(reservation.start).toLocaleDateString()}-
										{new Date(reservation.end).toLocaleDateString()}
									</Typography>
								</Grid>
							);
						})
					) : (
						<Typography variant="h4" className={classes.noReservationText}>
							--You have no upcoming reservations--
						</Typography>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};
