import { useState, useContext } from 'react';

import { Grid } from '@mui/material';

import { useStyles } from './AppDataPage.style';
import BikeDialog from './BikeDialog';
import UserDialog from './UserDialog';
import DataTable from '../../components/DataTable/DataTable';
import BikesContext from '../../contexts/bikes/context';
import AllUserContext from '../../contexts/allUsers/context';
import UserContext from '../../contexts/user/context';
import { deleteBikesFromContext } from '../../contexts/bikes/dispatchController';
import { UserProps } from '../../common/types';
import { deleteUsersFromContext } from '../../contexts/allUsers/dispatchController';

export const AppDataPage = (props: any) => {
	const classes = useStyles();
	//@ts-ignore
	const { bikes, bikesDispatch } = useContext(BikesContext);
	const { allUsers, allUsersDispatch } = useContext(AllUserContext);
	const { user } = useContext(UserContext);

	const [bikeModal, setBikeModal] = useState(false);
	const [userModal, setUserModal] = useState(false);
	const [tableKey, setTableKey] = useState(0);
	const [creatingManager, setCreatingManager] = useState(false);
	const [initialBike, setInitialBike] = useState(null);
	const [initialUser, setInitialUser] = useState(null);
	const [bikesPage, setBikesPage] = useState(0);
	const [usersPage, setUsersPage] = useState(0);
	const [managersPage, setManagersPage] = useState(0);
	const handleClose = () => {
		setBikeModal(false);
		setUserModal(false);
		setTableKey((pS) => pS + 1);
	};

	const addBikeAction = () => {
		setBikeModal(true);
	};
	const addUserAction = (isCreatingManager: boolean) => {
		setCreatingManager(isCreatingManager);
		setUserModal(true);
	};
	const removeBikes = (bikesToDelete) => {
		bikesToDelete = bikesToDelete.map((el) => {
			const ind = el.indexOf('id: ');
			return el.substring(ind + 4, el.length);
		});
		bikesDispatch(deleteBikesFromContext(bikesToDelete));
		setTableKey((pS) => pS + 1);
	};
	const removeUsers = (usersToDelete) => {
		const deletingUsers = allUsers
			.filter((el: UserProps) =>
				usersToDelete.includes(`${el.firstName} ${el.lastName}`)
			)
			.map((el) => el.id);
		allUsersDispatch(deleteUsersFromContext(deletingUsers));
		setTableKey((pS) => pS + 1);
	};
	return (
		<Grid>
			<BikeDialog
				initialBike={initialBike}
				setInitialBike={setInitialBike}
				open={bikeModal}
				onClose={handleClose}
			/>
			<UserDialog
				initialUser={initialUser}
				setInitialUser={setInitialUser}
				open={userModal}
				onClose={handleClose}
				isCreatingManager={creatingManager}
			/>
			<Grid
				container
				sx={{ padding: 2, paddingX: 4, overflow: 'auto' }}
				spacing={6}
			>
				<Grid md={6} sm={12} item xs={12}>
					<DataTable
						key={tableKey}
						rowData={bikes.map((bike) => ({
							...bike,
							title: `R: ${bike.rating}, ${bike.model}, ${bike.location}, id: ${bike.id}`,
						}))}
						tableTitle="Bikes"
						editAction={(bike) => {
							let editBike = { ...bike };
							delete editBike.title;
							setInitialBike(editBike);
							setBikeModal(true);
						}}
						page={bikesPage}
						rowsPerPageHOC={5}
						setPage={setBikesPage}
						deleting={false}
						deleteAction={removeBikes}
						addAction={addBikeAction}
					/>
				</Grid>
				<Grid md={6} sm={12} item xs={12}>
					<DataTable
						key={tableKey}
						rowData={allUsers
							.map((managedUser) => ({
								...managedUser,
								title: `${managedUser.firstName} ${managedUser.lastName}`,
							}))
							.filter((managedUser) => {
								if (
									user?.id !== managedUser?.id &&
									managedUser.role !== 'manager'
								) {
									return true;
								}
								return false;
							})}
						tableTitle="Users"
						editAction={(managedUser) => {
							let editUser = { ...managedUser };
							delete editUser.title;
							setInitialUser(editUser);
							setUserModal(true);
						}}
						page={usersPage}
						rowsPerPageHOC={5}
						setPage={setUsersPage}
						deleting={false}
						deleteAction={removeUsers}
						addAction={() => addUserAction(false)}
					/>
				</Grid>
				<Grid md={6} sm={12} item xs={12}>
					<DataTable
						key={tableKey}
						rowData={allUsers
							.map((managedUser) => ({
								...managedUser,
								title: `${managedUser.firstName} ${managedUser.lastName}`,
							}))
							.filter((managedUser) => {
								if (
									user?.id !== managedUser?.id &&
									managedUser.role !== 'user'
								) {
									return true;
								}
								return false;
							})}
						tableTitle="Managers"
						editAction={(managedUser) => {
							let editUser = { ...managedUser };
							delete editUser.title;
							setInitialUser(editUser);
							setUserModal(true);
						}}
						page={managersPage}
						rowsPerPageHOC={5}
						setPage={setManagersPage}
						deleting={false}
						deleteAction={removeUsers}
						addAction={() => addUserAction(true)}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};
