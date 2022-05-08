import { useState, useEffect, useContext, useMemo } from 'react';

import { Grid, Box, Typography } from '@mui/material';

import { useStyles } from './SearchPage.style';
import { SearchDrawer } from '../../components/SearchDrawer/SearchDrawer';
import { BikeCard } from '../../components/BikeCard/BikeCard';
import BikesContext from '../../contexts/bikes/context';
import { BikeProps } from '../../common/types';
import { useSearch } from '../../common/hooks/useSearch';
import { dateRangeOverlaps } from '../../common/helper/utils';
export const SearchPage = (props: any) => {
	const classes = useStyles();
	const { bikes, bikesDispatch } = useContext(BikesContext);
	// const [bikeResults, setBikeResults] = useState(bikes);
	const [renderKey, setRenderKey] = useState(0);
	const [modelData, setModelData] = useState<any[]>([]);
	const [ratingData, setRatingData] = useState<number[]>([0, 5]);
	const [colorData, setColorData] = useState<any[]>([]);
	const [locationData, setLocationData] = useState<any[]>([]);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [bikeResults, setBikeResults] = useState(bikes);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const { getResults } = useSearch(
		bikes,
		modelData,
		colorData,
		locationData,
		ratingData
	);

	const handleFilterData = (newData: any, type: string) => {
		if (type === 'models') {
			setModelData(newData);
		} else if (type === 'locations') {
			setLocationData(newData);
		} else if (type === 'colors') {
			setColorData(newData);
		}
		setBikeResults(getResults());
		setRenderKey((renderKey) => renderKey + 1);
	};
	useMemo(() => {
		let models: any[] = [];
		bikes.forEach((bike: BikeProps) => {
			if (!models.includes(bike.model)) {
				models.push(bike.model);
			}
		});
		models = models.map((el) => ({ label: el, checked: false }));
		setModelData(models);

		let locations: any[] = [];
		bikes.forEach((bike: BikeProps) => {
			if (!locations.includes(bike.location)) {
				locations.push(bike.location);
			}
		});
		locations = locations.map((el) => ({ label: el, checked: false }));
		setLocationData(locations);

		let colors: any[] = [];
		bikes.forEach((bike: BikeProps) => {
			if (!colors.includes(bike.color)) {
				colors.push(bike.color);
			}
		});
		colors = colors.map((el) => ({ label: el, checked: false }));
		setColorData(colors);
	}, [bikes]);

	useEffect(() => {
		if (startDate && endDate) {
			setBikeResults(() =>
				bikes.filter((el: BikeProps) => {
					let isBookedForThatTime = false;
					el.reservations.forEach(
						(reservation: { start: number; end: number }) => {
							if (
								dateRangeOverlaps(
									reservation.start,
									reservation.end,
									startDate.getTime(),
									endDate.getTime()
								)
							) {
								isBookedForThatTime = true;
							}
						}
					);
					return !isBookedForThatTime;
				})
			);
			setRenderKey((renderKey) => renderKey + 1);
		} else {
			setBikeResults(getResults());
		}
	}, [startDate, endDate, bikes]);

	return (
		<Grid container spacing={2}>
			<Grid item sm={2}>
				<Box
					sx={{
						display: 'flex',
						maxHeight: '90vh',
						flexDirection: 'column',
						overflowX: 'auto',
					}}
				>
					<SearchDrawer
						onChangeCommitted={handleFilterData}
						startDate={startDate}
						ratingData={ratingData}
						setRatingData={setRatingData}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate}
						modelData={modelData}
						setModelData={(d: any) => handleFilterData(d, 'models')}
						locationData={locationData}
						setLocationData={(d: any) => handleFilterData(d, 'locations')}
						colorData={colorData}
						setColorData={(d: any) => handleFilterData(d, 'colors')}
					/>
				</Box>
			</Grid>
			<Grid container item sm={10}>
				<Grid
					container
					item
					sm={12}
					sx={{
						paddingLeft: { lg: 2, md: 10, sm: 15, xs: 35 },
						paddingRight: { sm: 0, xs: 5 },
						paddingBottom: 4,
						marginTop: 0.1,
					}}
					spacing={4}
					key={renderKey}
				>
					{bikeResults.length ? (
						bikeResults.map((bike: BikeProps) => (
							<Grid key={bike.id} item xs={12} sm={6} md={4} lg={3}>
								<BikeCard {...bike} />
							</Grid>
						))
					) : (
						<Typography
							variant="h4"
							style={{
								marginTop: 60,
								marginLeft: 50,
								color: 'gray',
								fontStyle: 'italic',
							}}
						>
							No suitable bike matching search criteria
						</Typography>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};
