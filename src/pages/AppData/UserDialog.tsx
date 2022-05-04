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
import { UserForm } from '../../components/UserForm/UserForm';

export interface SimpleDialogProps {
	open: boolean;
	initialUser: any;
	setInitialUser: any;
	onClose: () => void;
	isCreatingManager: boolean;
}

export default function UserDialog(props: SimpleDialogProps) {
	const { onClose, open, initialUser, setInitialUser, isCreatingManager } =
		props;

	const handleClose = () => {
		onClose();
		setInitialUser(null);
	};

	return (
		<Dialog onClose={handleClose} open={open} maxWidth="lg">
			<DialogTitle>{isCreatingManager ? 'Manager' : 'User'} Editor</DialogTitle>
			<UserForm
				isCreatingManager={isCreatingManager}
				initialUser={initialUser}
				close={onClose}
			/>
		</Dialog>
	);
}
