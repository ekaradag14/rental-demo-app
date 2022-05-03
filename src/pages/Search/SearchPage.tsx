import { useState, useEffect } from 'react';

import { Grid, Box } from '@mui/material';

import { useStyles } from './SearchPage.style';
import { SearchDrawer } from '../../components/SearchDrawer/SearchDrawer';
import { BikeCard } from '../../components/BikeCard/BikeCard';
import bikeImage from '../../assets/bikes/bike1.jpg';
export const SearchPage = (props: any) => {
	const classes = useStyles();
	const [bikes, setBikes] = useState(bikesData);

	return (
		<Grid container>
			<Grid item sm={2}>
				<Box
					sx={{
						display: 'flex',
						maxHeight: '90vh',
						flexDirection: 'column',
						overflowX: 'auto',
					}}
				>
					<SearchDrawer />
				</Box>
			</Grid>
			<Grid item sm={10}>
				<Grid container paddingX={3} spacing={4} marginTop={3}>
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

const bikesData = [
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
