import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Cover } from '../../components/Cover/Cover';
import { BikeCard } from '../../components/BikeCard/BikeCard';
import AppBar from '../../components/AppBar/AppBar';
import bikeImage from '../../assets/bikes/bike1.jpg';
import { useStyles } from './HomePage.style';
import { bikesData as bikes } from '../Search/SearchPage';
export const HomePage = (props: any) => {
	const classes = useStyles();

	return (
		<Grid>
			<Grid style={{ padding: 10 }}>
				<Cover />
				<Grid container spacing={4} marginTop={3}>
					{bikes.map(
						({
							model,
							color,
							location,
							rating,
							available,
							img,
							description,
						}) => (
							<Grid key={model} item xs={2} sm={3} md={3}>
								<BikeCard
									model={model}
									color={color}
									location={location}
									rating={rating}
									available={available}
									img={img}
									description={description}
								/>
							</Grid>
						)
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};
