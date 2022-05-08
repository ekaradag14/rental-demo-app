import bikeImage from '../assets/bikes/bike.png';
import bikeImage1 from '../assets/bikes/bike1.png';
import bikeImage2 from '../assets/bikes/bike2.png';
import bikeImage3 from '../assets/bikes/bike3.png';
import bikeImage4 from '../assets/bikes/bike4.png';
import bikeImage5 from '../assets/bikes/bike5.png';
import bikeImage6 from '../assets/bikes/bike6.png';
import bikeImage7 from '../assets/bikes/bike7.png';
import bikeImage8 from '../assets/bikes/bike8.png';
import { BikeProps } from '../common/types';
export const bikesData: BikeProps[] = [
	{
		id: 'ggfsbas',
		model: 'Gallardo',
		color: '#003E40',
		location: 'Berlin',
		rating: 4.5,
		available: true,
		img: bikeImage6,
		reservations: [
			{
				bikeId: 'ggfsbas',
				end: 1653053108000,
				reservationId: 'boz7qhhh6zk',
				start: 1652707493000,
				userId: 'asygduab',
			},
			{
				bikeId: 'ggfsbas',
				end: 1751862246000,
				reservationId: 'box7qhhh6zk',
				start: 1751689443000,
				userId: 'hsdvytvd',
			},
		],
		description:
			'A long-travel all-mountain bike built for racing enduro lines and having a good time in the rough.',
	},
	{
		id: 'hcdsbas',
		model: 'Émonda',
		color: '#003E40',
		location: 'Berlin',
		rating: 3.8,
		available: true,
		img: bikeImage,
		reservations: [
			{
				bikeId: 'hcdsbas',
				end: 1652880318000,
				reservationId: 'boz7xchh6zk',
				start: 1652707515000,
				userId: 'asygduab',
			},
			{
				start: 1652192391000,
				end: 1652451595000,
				userId: 'hsgfdlytvd',
				bikeId: 'hcdsbas',
				reservationId: 'wjo10w24wck',
			},
		],
		description:
			'The ride-it-all MTB. It’s fast and fun everywhere—no wonder it’s our most popular trail bike!',
	},
	{
		id: 'hhfgbas',
		model: 'Gallardo',
		color: '#003E40',
		location: 'Madrid',
		rating: 4.8,
		available: false,
		img: bikeImage6,
		reservations: [],
		description:
			'A long-travel all-mountain bike built for racing enduro lines and having a rippin’ good time in the rough.',
	},

	{
		id: 'hhaskns',
		model: 'Rail 9',
		color: '#480404',
		location: 'Berlin',
		rating: 1.8,
		available: true,
		img: bikeImage4,
		reservations: [
			{
				start: 1652624155000,
				end: 1652969761000,
				userId: 'hstyreklytvd',
				bikeId: 'hhaskns',
				reservationId: 'vaq2f8to4ha',
			},
			{
				start: 1652365181000,
				end: 1652537983000,
				userId: 'hsgfdlytvd',
				bikeId: 'hhaskns',
				reservationId: 'zyanzcirn2',
			},
		],
		description:
			'A lightweight 400 OCLV Carbon frame, a high-quality drivetrain, and Bontrager carbon wheels.',
	},
	{
		id: 'xfjgkns',
		model: 'Sakur',
		color: '#489405',
		location: 'Madrid',
		rating: 2.8,
		available: true,
		img: bikeImage5,
		reservations: [],
		description:
			'A full carbon frame, all-new hard-charging suspension with fast-rolling carbon wheels.',
	},

	{
		id: 'utervfg',
		model: 'Velve',
		color: '#125',
		location: 'Bucharest',
		rating: 3.2,
		available: true,
		img: bikeImage8,
		reservations: [
			{
				start: 1652365167000,
				end: 1652537973000,
				userId: 'hsgfdlytvd',
				bikeId: 'utervfg',
				reservationId: 'snef2fv0ld',
			},
			{
				start: 1652969769000,
				end: 1653488172000,
				userId: 'hstyreklytvd',
				bikeId: 'utervfg',
				reservationId: 'y1ukty0gzk',
			},
		],
		description:
			' Rack and fender mounts, a wide range of gearing for climbing, and a stable touring geometry make it the perfect choice for loaded multi-day trips and comfortable all-day adventures.',
	},

	{
		id: 'kdvasxns',
		model: 'Domane',
		color: '#ba000d',
		location: 'Berlin',
		rating: 4.5,
		available: true,
		img: bikeImage2,
		reservations: [
			{
				start: 1652969789000,
				end: 1653228992000,
				userId: 'hstyreklytvd',
				bikeId: 'kdvasxns',
				reservationId: 'ggtdp6mk2jo',
			},
		],
		description:
			'His high-end endurance road bike comes equipped with a new Dura-Ace Di2 wireless electronic.',
	},
	{
		id: 'xcfasxns',
		model: 'Rail 9',
		color: '#480404',
		location: 'Bucharest',
		rating: 4.2,
		available: true,
		img: bikeImage4,
		reservations: [],
		description:
			'A lightweight 400 OCLV Carbon frame, a high-quality drivetrain, and Bontrager carbon wheels.',
	},
	{
		id: 'hhtynsxns',
		model: 'Allant',
		color: '#12c5',
		location: 'Istanbul',
		rating: 4.2,
		available: true,
		img: bikeImage7,
		reservations: [
			{
				start: 1652710578000,
				end: 1652969781000,
				userId: 'hstyreklytvd',
				bikeId: 'hhtynsxns',
				reservationId: 'c3vctjuakdg',
			},
		],
		description:
			"520 is a steel touring bike made for the open road. It's the longest-running model in our lineup, and it's built to carry you and your gear on your longest journeys. ",
	},
	{
		id: 'nxasie',
		model: 'Velve',
		color: '#125',
		location: 'Istanbul',
		rating: 3.2,
		available: true,
		img: bikeImage8,
		reservations: [],
		description:
			' Rack and fender mounts, a wide range of gearing for climbing, and a stable touring geometry make it the perfect choice for loaded multi-day trips and comfortable all-day adventures.',
	},
];
