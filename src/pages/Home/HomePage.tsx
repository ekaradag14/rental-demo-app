import { useState, useEffect, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Divider, Grid, Typography } from '@mui/material';
import { Cover } from '../../components/Cover/Cover';
import { BikeCard } from '../../components/BikeCard/BikeCard';
import AppBar from '../../components/AppBar/AppBar';
import bikeImage from '../../assets/bikes/bike1.jpg';
import { useStyles } from './HomePage.style';
import { BikeProps } from '../../common/types';
// import { bikesData as bikes } from '../../data/bikes';
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
				<Typography variant="h3" style={{ color: 'gray', marginTop: 10 }}>
					Your Upcoming Bookings
				</Typography>
				<Grid container key={renderKey} spacing={4} marginTop={1}>
					{user.reservations.length ? (
						user.reservations.map((reservation) => {
							const bike = bikes.find((el) => el.id === reservation.bikeId);
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
									<Typography
										variant="h4"
										style={{ color: 'gray', marginLeft: 20 }}
									>
										{new Date(reservation.start).toLocaleDateString()}-
										{new Date(reservation.end).toLocaleDateString()}
									</Typography>
								</Grid>
							);
						})
					) : (
						<Typography
							variant="h4"
							style={{
								marginTop: 60,
								marginLeft: 150,
								color: 'gray',
								fontStyle: 'italic',
							}}
						>
							--You have no upcoming reservations--
						</Typography>
					)}
					{/* {(bikes as BikeProps[]).map((bike) => (
						<Grid key={bike.id} item xs={12} sm={6} md={4} lg={3}>
							<BikeCard {...bike} />
						</Grid>
					))} */}
				</Grid>
			</Grid>
		</Grid>
	);
};
