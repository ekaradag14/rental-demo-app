import React, { useEffect, useState, useContext } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { Typography, Grid, TextField, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RatingStars } from './RatingStars';
import { generateRandomID } from '../../common/helper/utils';
import BikesContext from '../../contexts/bikes/context';
import UserContext from '../../contexts/user/context';
import { addBikeReservationInContext } from '../../contexts/bikes/dispatchController';
import { addReservationToUser } from '../../contexts/user/dispatchController';
import AlertContext from '../../contexts/alert/context';
import { setAlert } from '../../contexts/alert/dispatchController';
import { alertMessages } from '../../common/helper/alertMessages';
export interface RentModalProps {
	open: boolean;
	bike: any;
	reservations: any[];
	onClose: () => void;
}

export const RentModal = (props: RentModalProps) => {
	const { onClose, open, bike, reservations } = props;
	const [startDate, setStartDate] = useState(null);
	const [maxDate, setMaxDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [minDate, setMinDate] = useState(null);
	const { alertDispatch } = useContext(AlertContext);
	const { bikesDispatch } = useContext(BikesContext);
	const { user, userDispatch } = useContext(UserContext);
	const handleClose = () => {
		resetReservation();
		onClose();
	};

	const resetReservation = () => {
		setStartDate(null);
		setMaxDate(null);
		setEndDate(null);
		setMinDate(null);
	};

	const disableDates = (date) => {
		let shouldBeDisabled = false;

		reservations.forEach((el) => {
			if (
				(new Date(date).getTime() >= el.start + 3 &&
					new Date(date).getTime() <= el.end - 3) ||
				new Date(date).toLocaleDateString() ===
					new Date(el.start).toLocaleDateString()
			)
				shouldBeDisabled = true;
		});
		return shouldBeDisabled;
	};
	const handleSubmit = () => {
		const reservation = {
			start: startDate.getTime(),
			end: endDate.getTime(),
			userId: user.id,
			bikeId: bike.id,
			reservationId: generateRandomID(),
		};
		bikesDispatch(addBikeReservationInContext(reservation, bike.id));
		userDispatch(addReservationToUser(reservation));
		alertDispatch(setAlert(alertMessages.SUCCESSFUL_RENT));
		handleClose();
	};
	useEffect(() => {
		if (startDate) {
			let res = [];
			reservations.forEach((el) => {
				res.push(el.start);
				res.push(el.end);
			});
			res.push(new Date(startDate).getTime());
			res.sort(function (a, b) {
				return a - b;
			});
			let closestReservationStartIndex =
				res.indexOf(new Date(startDate).getTime()) + 1;
			if (res[closestReservationStartIndex]) {
				setMaxDate(new Date(res[closestReservationStartIndex]));
			}
		}
		if (endDate) {
			let res = [];
			reservations.forEach((el) => {
				res.push(el.start);
				res.push(el.end);
			});
			res.push(new Date(endDate).getTime());
			res.sort(function (a, b) {
				return a - b;
			});
			let closestReservationStartIndex =
				res.indexOf(new Date(endDate).getTime()) - 1;
			if (res[closestReservationStartIndex]) {
				setMinDate(new Date(res[closestReservationStartIndex]));
			}
		}
	}, [startDate, endDate, reservations]);

	return (
		<Dialog onClose={handleClose} open={open} maxWidth="md">
			<DialogTitle>
				Rent {bike.model} on {bike.location}
			</DialogTitle>
			<Grid container padding={2}>
				<Grid item md={6}>
					<img width={300} alt="bike model" src={bike.img} />
				</Grid>
				<Grid item md={6}>
					<Grid style={{ display: 'block', paddingBottom: 10 }}>
						<RatingStars
							id={bike.id}
							marginLeft="revert"
							rating={bike.rating}
						/>
					</Grid>

					<Typography>{bike.description}</Typography>

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Grid marginTop={1} container spacing={3}>
							<Grid item sm={6}>
								<DatePicker
									label="Start Date"
									value={startDate}
									disablePast
									minDate={minDate}
									maxDate={endDate}
									clearable={true}
									shouldDisableDate={disableDates}
									onChange={(newValue) => {
										setStartDate(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</Grid>
							<Grid item sm={6}>
								<DatePicker
									label="End Date"
									value={endDate}
									disablePast
									minDate={startDate}
									shouldDisableDate={disableDates}
									onChange={(newValue) => {
										setEndDate(newValue);
									}}
									maxDate={maxDate}
									renderInput={(params) => <TextField {...params} />}
								/>
							</Grid>
						</Grid>
					</LocalizationProvider>
					<Grid container marginTop={1} spacing={3}>
						<Grid item sm={2}>
							<Button
								variant="contained"
								disabled={!startDate || !endDate}
								onClick={handleSubmit}
							>
								Rent
							</Button>
						</Grid>
						<Grid item sm={1}></Grid>
						<Grid item sm={2}>
							<Button
								onClick={() => resetReservation()}
								variant="contained"
								color="warning"
							>
								Reset
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};
