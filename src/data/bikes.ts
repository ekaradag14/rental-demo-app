import bikeImage from '../assets/bikes/bike1.jpg';
import bikeImage2 from '../assets/bikes/bike2.webp';
import bikeImage3 from '../assets/bikes/bike3.webp';
import bikeImage4 from '../assets/bikes/bike4.webp';
import bikeImage5 from '../assets/bikes/bike5.webp';
import { BikeProps } from '../common/types';
export const bikesData: BikeProps[] = [
	{
		id: '0',
		model: 'Gallardo',
		color: '#003E40',
		location: 'Berlin',
		rating: 4.5,
		available: true,
		img: bikeImage,
		reservations: [{ start: 1652276477000, end: 1652362879000 }],
		description:
			'A long-travel all-mountain bike built for racing enduro lines and having a rippin’ good time in the rough.',
	},
	{
		id: '1',
		model: 'Marlin 6',
		color: '#003E40',
		location: 'Berlin',
		rating: 3.8,
		available: true,
		img: bikeImage2,
		reservations: [],
		description:
			'The ride-it-all MTB. It’s fast and fun everywhere—no wonder it’s our most popular trail bike!',
	},
	{
		id: '2',
		model: 'Gallardo',
		color: '#06A189',
		location: 'Madrid',
		rating: 4.8,
		available: false,
		img: bikeImage,
		reservations: [],
		description:
			'This hardtail’s all about having a blast on the trail thanks to grippy 2.8˝ tires and a burly 120mm fork.',
	},
	{
		id: '3',
		model: 'Roscoe 6',
		color: '#0B0B0B',
		location: 'Berlin',
		rating: 4.8,
		available: true,
		img: bikeImage3,
		reservations: [],
		description:
			'Snappy 27.5˝ wheels make this the rig for popping off jumps, and throwing the bike around.',
	},
	{
		id: '4',
		model: 'Rail 9',
		color: '#480404',
		location: 'Berlin',
		rating: 4.8,
		available: true,
		img: bikeImage4,
		reservations: [],
		description:
			'A lightweight 400 OCLV Carbon frame, a high-quality drivetrain, and Bontrager carbon wheels.',
	},
];
