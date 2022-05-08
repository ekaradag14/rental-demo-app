import { useState, useEffect, useContext } from 'react';

import { Grid, Typography } from '@mui/material';

import { useStyles } from './ReservationsPage.style';
import { ReservationsTable } from './ReservationsTable';
import { UserFilter } from './UserFilter';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import BikesContext from '../../contexts/bikes/context';
import AllUserContext from '../../contexts/allUsers/context';
import { BikeProps, UserProps } from '../../common/types';
import { DatePickerFilter } from '../../components/Filter/DatePickerFilter';
import { shortenText } from '../../common/helper/utils';

const createReservations = (
	bikes,
	allUsers,
	selectedBikes: any[] = [],
	selectedUsers: any[] = [],
	startDate?: Date | null,
	endDate?: Date | null
) => {
	let reservations = [];
	if (selectedBikes.length) {
		selectedBikes = selectedBikes.map((el) => el.id);
	}
	if (selectedUsers.length) {
		selectedUsers = selectedUsers.map((el) => el.id);
	}

	bikes.forEach((bike) => {
		reservations.push(...bike.reservations);
	});

	reservations = reservations
		.map((res) => ({
			...res,
			bike: bikes.find((bike) => bike.id === res.bikeId),
			user: allUsers.find((user) => user.id === res.userId),
		}))
		.filter((res) => {
			if (
				(selectedBikes.length && !selectedBikes.includes(res.bikeId)) ||
				(selectedUsers.length && !selectedUsers.includes(res.userId)) ||
				(startDate && res.start < startDate.getTime()) ||
				(endDate && res.end > endDate.getTime())
			) {
				return false;
			}
			return true;
		});

	return reservations;
};

export const ReservationsPage = (props: any) => {
	const classes = useStyles();
	const [selectedBikes, setSelectedBikes] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [reservations, setReservations] = useState([]);
	const [searchKey, setSearchKey] = useState(0);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const { bikes, bikesDispatch } = useContext(BikesContext);
	const { allUsers, allUsersDispatch } = useContext(AllUserContext);

	useEffect(() => {
		setReservations(
			createReservations(
				bikes,
				allUsers,
				selectedBikes,
				selectedUsers,
				startDate,
				endDate
			)
		);
		setSearchKey((pS) => pS + 1);
	}, [selectedBikes, selectedUsers, bikes, allUsers, startDate, endDate]);

	useEffect(() => {
		setReservations(createReservations(bikes, allUsers));
	}, []);
	return (
		<Grid>
			<Grid container padding={2} spacing={3}>
				<Grid item md={12}>
					<Typography color="primary" variant="h6">
						Reservations
					</Typography>
				</Grid>
				<Grid item md={3}>
					<Autocomplete
						multiple
						id="tags-outlined"
						limitTags={2}
						options={allUsers}
						getOptionLabel={(option: UserProps) =>
							shortenText(`${option.firstName} ${option.lastName}`, 70)
						}
						filterSelectedOptions
						renderInput={(params) => (
							<TextField {...params} placeholder="Users" />
						)}
						value={selectedUsers}
						onChange={(event, values) => setSelectedUsers(values)}
					/>
				</Grid>
				<Grid item md={3}>
					<Autocomplete
						multiple
						id="tags-outlined"
						limitTags={1}
						options={bikes}
						getOptionLabel={(option: BikeProps) =>
							`${option.model}, ${option.location}, id: ${option.id}`
						}
						filterSelectedOptions
						renderInput={(params) => (
							<TextField {...params} placeholder="Bikes" />
						)}
						value={selectedBikes}
						onChange={(event, values) => setSelectedBikes(values)}
					/>
				</Grid>
				<Grid spacing={3} container item md={6}>
					<DatePickerFilter
						disablePast={false}
						width={6}
						startDate={startDate}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate}
					/>
				</Grid>
				<Grid item md={12} key={searchKey}>
					<ReservationsTable reservations={reservations} />
				</Grid>
			</Grid>
		</Grid>
	);
};
