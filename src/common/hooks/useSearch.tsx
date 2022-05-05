import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { BikeProps } from '../types';

export function useSearch(
	bikes: any,
	modelData: any,
	colorData: any,
	locationData: any,
	ratingData: any,
	startDate?: Date | null,
	endDate?: Date | null
) {
	const getResults = () => {
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
				el.rating >= Math.min(...ratingData) &&
				el.rating <= Math.max(...ratingData)
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
		// if (startDate && endDate) {
		// 	console.log('dates are', startDate, endDate, searchResults);
		// 	searchResults.filter((el: BikeProps) => {
		// 		let isBookedForThatTime = false;
		// 		el.reservations.forEach(
		// 			(reservation: { start: number; end: number }) => {
		// 				if (
		// 					dateRangeOverlaps(
		// 						reservation.start,
		// 						reservation.end,
		// 						startDate.getTime(),
		// 						endDate.getTime()
		// 					)
		//                 ) {
		//                     console.log('hey')
		// 					isBookedForThatTime = true;
		// 				}
		// 			}
		// 		);
		// 		return !isBookedForThatTime;
		// 	});
		// 	console.log('dates are2', searchResults);
		// }
		return searchResults;
	};

	return {
		getResults,
	};
}
