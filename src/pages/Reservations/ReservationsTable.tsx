import React, { useEffect, useState } from 'react';
import { Table, Typography, Grid } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useStyles } from './ReservationsPage.style';
import { shortenText } from '../../common/helper/utils';

export const ReservationsTable = ({ reservations }: { reservations: any }) => {
	const classes = useStyles();

	return (
		<TableContainer component={Paper} style={{ padding: 20 }}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>User</TableCell>
						<TableCell align="right">Dates</TableCell>
						<TableCell align="right">Location</TableCell>
						<TableCell align="right">Model</TableCell>
						<TableCell align="right">Bike Rating</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{reservations.length ? (
						reservations.map((row) => (
							<TableRow
								key={row.reservationId}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									<Grid
										style={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
										}}
									>
										<img
											alt="bike preview"
											src={row.bike.img}
											style={{ height: 40, marginRight: 20 }}
										/>
										{`${row.user.firstName} ${row.user.lastName}`}
									</Grid>
								</TableCell>
								<TableCell align="right">
									{new Date(row.start).toLocaleDateString()}-
									{new Date(row.end).toLocaleDateString()}
								</TableCell>
								<TableCell align="right">
									{shortenText(row.bike.location, 30)}
								</TableCell>
								<TableCell align="right">
									{shortenText(row.bike.model, 30)}
								</TableCell>
								<TableCell align="right">{row.bike.rating}</TableCell>
							</TableRow>
						))
					) : (
						<Typography variant="h6" className={classes.noReservationText}>
							--No matching reservation was found--
						</Typography>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
