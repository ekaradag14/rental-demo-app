import { useState, useEffect } from 'react';

import { Grid } from '@mui/material';
import { Cover } from '../../components/Cover/Cover';
import { BikeCard } from '../../components/BikeCard/BikeCard';
import AppBar from '../../components/AppBar/AppBar';
import bikeImage from '../../assets/bikes/bike1.jpg';

export const Main = (props: any) => {
	// const classes = useStyles();

	return (
		<>
			<Cover />
			<Grid container spacing={4} marginTop={3}>
				{bikes.map(
					({ model, color, location, rating, available, img, description }) => (
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
		</>
	);
};

const bikes = [
	{
		model: 'Gallardo',
		color: 'red',
		location: 'Berlin',
		rating: 4.5,
		available: true,
		img: bikeImage,
		description:
			'Deserunt non eiusmod qui consectetur et adipisicing reprehenderit ex dolore ullamco ut aliquip consequat ex.',
	},
	{
		model: 'Lambardo',
		color: 'blue',
		location: 'Berlin',
		rating: 3.8,
		available: true,
		img: bikeImage,
		description:
			'Deserunt non eiusmod qui consectetur et adipisicing reprehenderit ex dolore ullamco ut aliquip consequat ex.',
	},
	{
		model: 'Gallardo',
		color: 'black',
		location: 'Berlin',
		rating: 4.8,
		available: false,
		img: bikeImage,
		description:
			'Deserunt non eiusmod qui consectetur et adipisicing reprehenderit ex dolore ullamco ut aliquip consequat ex.',
	},
	{
		model: 'Gallardo',
		color: 'black',
		location: 'Berlin',
		rating: 4.8,
		available: true,
		img: bikeImage,
		description:
			'Deserunt non eiusmod qui consectetur et adipisicing reprehenderit ex dolore ullamco ut aliquip consequat ex.',
	},
	{
		model: 'Gallardo',
		color: 'black',
		location: 'Berlin',
		rating: 4.8,
		available: true,
		img: bikeImage,
		description:
			'Deserunt non eiusmod qui consectetur et adipisicing reprehenderit ex dolore ullamco ut aliquip consequat ex.',
	},
];
