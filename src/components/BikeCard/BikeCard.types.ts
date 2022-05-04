export interface BikeCardProps {
	id: string;
	model: string;
	color: string;
	location: string;
	rating: number;
	available: boolean;
	img: string;
	description: string;
	reservations: any[];
	reservationId?: string;
	setRenderKey?: any;
}
