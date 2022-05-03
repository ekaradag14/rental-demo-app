export interface BikeProps {
	id: string;
	model: string;
	color: string;
	location: string;
	rating: number;
	available: boolean;
	img: any;
	reservations: {
		start: number;
		end: number;
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
		start: number;
		end: number;
	}[];
}
