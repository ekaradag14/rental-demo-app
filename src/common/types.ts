export interface BikeProps {
	id: string;
	model: string;
	color: string;
	location: string;
	rating: number;
	available: boolean;
	img: any;
	reservations: {
		bikeId: string;
		end: number;
		reservationId: string;
		start: number;
		userId: string;
	}[];
	description: string;
}

export interface UserProps {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
	reservations: {
		bikeId: string;
		end: number;
		reservationId: string;
		start: number;
		userId: string;
	}[];
}
