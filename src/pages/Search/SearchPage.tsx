import { useState, useEffect } from 'react';

import { Grid, Box } from '@mui/material';

import { useStyles } from './SearchPage.style';
import { SearchDrawer } from '../../components/SearchDrawer/SearchDrawer';
import { BikeCard } from '../../components/BikeCard/BikeCard';
import bikeImage from '../../assets/bikes/bike1.jpg';

export const SearchPage = (props: any) => {
	const classes = useStyles();
	const [bikes, setBikes] = useState(bikesData);
	const [renderKey, setRenderKey] = useState(0);
	const [modelData, setModelData] = useState<any[]>([]);
	const [colorData, setColorData] = useState<any[]>([]);
	const [locationData, setLocationData] = useState<any[]>([]);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	// useEffect(() => {
	// 	let selectedModels: string[] = modelData
	// 		.filter((el) => el.checked)
	// 		.map((el) => el.label);

	// 	if (selectedModels.length) {
	// 		setBikes((bikes) =>
	// 			bikes.filter((el) => selectedModels.includes(el.model))
	// 		);
	// 	}
	// 	setRenderKey((renderKey) => renderKey + 1);
	// }, [modelData]);

	const handleFilterData = (newData: any, type: string) => {
		if (type === 'models') {
			setModelData(newData);
		} else if (type === 'locations') {
			setLocationData(newData);
		} else if (type === 'colors') {
			setColorData(newData);
		}
		let searchResults = [...bikesData];

		let selectedModels: string[] = modelData
			.filter((el) => el.checked)
			.map((el) => el.label);
		if (selectedModels.length) {
			searchResults = searchResults.filter((el) =>
				selectedModels.includes(el.model)
			);
		}

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

		setBikes(searchResults);
		setRenderKey((renderKey) => renderKey + 1);
	};

	useEffect(() => {
		let models: any[] = [];
		bikesData.forEach((bike) => {
			if (!models.includes(bike.model)) {
				models.push(bike.model);
			}
		});
		models = models.map((el) => ({ label: el, checked: false }));
		setModelData(models);

		let locations: any[] = [];
		bikesData.forEach((bike) => {
			if (!locations.includes(bike.location)) {
				locations.push(bike.location);
			}
		});
		locations = locations.map((el) => ({ label: el, checked: false }));
		setLocationData(locations);

		let colors: any[] = [];
		bikesData.forEach((bike) => {
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
			setBikes(() =>
				bikesData.filter((el) => {
					let isBookedForThatTime = false;
					el.reservations.forEach((reservation) => {
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
					});
					return !isBookedForThatTime;
				})
			);
			setRenderKey((renderKey) => renderKey + 1);
		}
	}, [startDate, endDate]);

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
					<SearchDrawer
						startDate={startDate}
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
				<Grid container paddingX={3} spacing={4} marginTop={3} key={renderKey}>
					{bikes.length ? (
						bikes.map(
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
								<Grid key={id} item xs={2} sm={3} md={3}>
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

export const bikesData = [
	{
		id: 0,
		model: 'Gallardo',
		color: '#003E40',
		location: 'Berlin',
		rating: 4.5,
		available: true,
		img: bikeImage,
		reservations: [{ start: 1652276477000, end: 1652362879000 }],
		description:
			'Deserunt non eiusmod qui consectetur et adipisicing reprehenderit ex dolore ullamco ut aliquip consequat ex.',
	},
	{
		id: 1,
		model: 'Lambardo',
		color: '#003E40',
		location: 'Berlin',
		rating: 3.8,
		available: true,
		img: bikeImage,
		reservations: [],
		description:
			'Deserunt non eiusmod qui consectetur et adipisicing reprehenderit ex dolore ullamco ut aliquip consequat ex.',
	},
	{
		id: 2,
		model: 'Gallardo',
		color: '#06A189',
		location: 'Madrid',
		rating: 4.8,
		available: false,
		img: bikeImage,
		reservations: [],
		description:
			'Deserunt non eiusmod qui consectetur et adipisicing reprehenderit ex dolore ullamco ut aliquip consequat ex.',
	},
	{
		id: 3,
		model: 'Gallardo3',
		color: '#0B0B0B',
		location: 'Berlin',
		rating: 4.8,
		available: true,
		img: bikeImage,
		reservations: [],
		description:
			'Deserunt non eiusmod qui consectetur et adipisicing reprehenderit ex dolore ullamco ut aliquip consequat ex.',
	},
	{
		id: 4,
		model: 'Gallardo4',
		color: '#480404',
		location: 'Berlin',
		rating: 4.8,
		available: true,
		img: bikeImage,
		reservations: [],
		description:
			'Deserunt non eiusmod qui consectetur et adipisicing reprehenderit ex dolore ullamco ut aliquip consequat ex.',
	},
];

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
