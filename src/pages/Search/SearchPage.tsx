import { useState, useEffect, useContext } from 'react';

import { Grid, Box } from '@mui/material';

import { useStyles } from './SearchPage.style';
import { SearchDrawer } from '../../components/SearchDrawer/SearchDrawer';
import { BikeCard } from '../../components/BikeCard/BikeCard';
import BikesContext from '../../contexts/bikes/context';
import { BikeProps } from '../../common/types';

export const SearchPage = (props: any) => {
	const classes = useStyles();
	//@ts-ignore
	const { bikes, bikesDispatch } = useContext(BikesContext);
	const [bikeResults, setBikeResults] = useState(bikes);
	const [renderKey, setRenderKey] = useState(0);
	const [modelData, setModelData] = useState<any[]>([]);
	const [ratingData, setRatingData] = useState<number[]>([1, 5]);
	const [colorData, setColorData] = useState<any[]>([]);
	const [locationData, setLocationData] = useState<any[]>([]);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleFilterData = (newData: any, type: string) => {
		if (type === 'models') {
			setModelData(newData);
		} else if (type === 'locations') {
			setLocationData(newData);
		} else if (type === 'colors') {
			setColorData(newData);
		}
		let searchResults = [...bikes];

		let selectedModels: string[] = modelData
			.filter((el) => el.checked)
			.map((el) => el.label);
		if (selectedModels.length) {
			searchResults = searchResults.filter((el) =>
				selectedModels.includes(el.model)
			);
		}

		searchResults = searchResults.filter(
			(el) =>
				el.rating > Math.min(...ratingData) &&
				el.rating < Math.max(...ratingData)
		);

		let selectedLocations: string[] = locationData
			.filter((el) => el.checked)
			.map((el) => el.label);

		if (selectedLocations.length) {
			searchResults = searchResults.filter((el) =>
				selectedLocations.includes(el.location)
			);
		}

		let selectedColors: string[] = colorData
			.filter((el) => el.checked)
			.map((el) => el.label);

		if (selectedColors.length) {
			searchResults = searchResults.filter((el) =>
				selectedColors.includes(el.color)
			);
		}

		setBikeResults(searchResults);
		setRenderKey((renderKey) => renderKey + 1);
	};

	useEffect(() => {
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
	}, []);

	useEffect(() => {
		if (startDate && endDate) {
			console.log(startDate.getTime(), endDate.getTime());
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
		}
	}, [startDate, endDate]);

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
			<Grid item sm={10}>
				<Grid
					container
					sm={12}
					sx={{
						paddingLeft: { lg: 2, md: 10, sm: 15, xs: 35 },
						paddingRight: { sm: 0, xs: 5 },
						marginTop: 0.1,
					}}
					spacing={4}
					key={renderKey}
				>
					{bikeResults.length ? (
						bikeResults.map(
							({
								id,
								model,
								color,
								location,
								rating,
								available,
								img,
								description,
							}: BikeProps) => (
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
						)
					) : (
						<p>No suitable bike</p>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

function dateRangeOverlaps(
	a_start: number,
	a_end: number,
	b_start: number,
	b_end: number
) {
	let hasOverlap = false;
	if (a_start < b_start && b_start < a_end) hasOverlap = true; // b starts in a
	if (a_start < b_end && b_end < a_end) hasOverlap = true; // b ends in a
	if (b_start < a_start && a_end < b_end) hasOverlap = true; // a in b
	return hasOverlap;
}
