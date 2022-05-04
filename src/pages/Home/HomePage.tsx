import { useState, useEffect, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Cover } from '../../components/Cover/Cover';
import { BikeCard } from '../../components/BikeCard/BikeCard';
import AppBar from '../../components/AppBar/AppBar';
import bikeImage from '../../assets/bikes/bike1.jpg';
import { useStyles } from './HomePage.style';
import { BikeProps } from '../../common/types';
// import { bikesData as bikes } from '../../data/bikes';
import BikesContext from '../../contexts/bikes/context';

export const HomePage = (props: any) => {
	const classes = useStyles();
	//@ts-ignore
	const { bikes } = useContext(BikesContext);
	return (
		<Grid>
			<Grid style={{ padding: 10 }}>
				<Cover />
				<Grid container spacing={4} marginTop={3}>
					{(bikes as BikeProps[]).map(
						({
							id,
							model,
							color,
							location,
							rating,
							available,
							img,
							description,
						}) => (
							<Grid key={id} item xs={12} sm={6} md={4} lg={3}>
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
