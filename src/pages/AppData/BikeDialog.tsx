import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { CreateBike } from '../../components/CreateBike/CreateBike';

export interface SimpleDialogProps {
	open: boolean;
	initialBike: any;
	setInitialBike: any;
	onClose: () => void;
}

export default function BikeDialog(props: SimpleDialogProps) {
	const { onClose, open, initialBike, setInitialBike } = props;

	const handleClose = () => {
		onClose();
		setInitialBike(null);
	};

	return (
		<Dialog onClose={handleClose} open={open} maxWidth="lg">
			<DialogTitle>Bike Editor</DialogTitle>
			<CreateBike initialBike={initialBike} close={onClose} />
		</Dialog>
	);
}
