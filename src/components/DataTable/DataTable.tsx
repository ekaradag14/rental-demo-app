import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableSortLabel,
	Toolbar,
	Typography,
	Paper,
	Checkbox,
	Tooltip,
} from '@mui/material';

import IconButton from '@material-ui/core/IconButton';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import DeleteIcon from '@material-ui/icons/Delete';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import { shortenText } from '../../common/helper/utils';

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'title',
		numeric: false,
		disablePadding: true,
		label: 'Title',
	},
	{
		id: 'editSection',
		numeric: false,
		disablePadding: true,
		label: '',
	},
];

function EnhancedTableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox" style={{ padding: '6px 8px' }}>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all titles' }}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: '1 1 100%',
	},
}));

const EnhancedTableToolbar = ({
	numSelected,
	deleteAction,
	selected,
	deleting,
	tableTitle,
	addAction,
}) => {
	const classes = useToolbarStyles();

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant="h6"
					id="tableTitle"
					component="div"
					color="primary"
				>
					{tableTitle}
				</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip title="Delete" placement="bottom">
					<IconButton
						aria-label="delete"
						onClick={(e) => {
							deleteAction(selected);
						}}
						disabled={deleting}
					>
						{deleting ? <CircularProgress /> : <DeleteIcon />}
					</IconButton>
				</Tooltip>
			) : (
				addAction && (
					<Tooltip title="Add" placement="bottom">
						<IconButton
							aria-label="add"
							onClick={(e) => {
								addAction(selected);
							}}
							disabled={deleting}
						>
							<AddRoundedIcon />
						</IconButton>
					</Tooltip>
				)
			)}
		</Toolbar>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		width: '100%',
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}));

export default function EnhancedTable({
	editAction,
	deleteAction,
	deleting,
	rowData,
	page,
	setPage,
	tableTitle,
	rowsPerPageHOC,
	addAction,
}) {
	const classes = useStyles();
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('title');
	const [rows, setRows] = useState(rowData);
	const [selected, setSelected] = useState([]);

	const [willBeDeleted, setWillBeDeleted] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageHOC || 5);
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.title);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, title) => {
		const selectedIndex = selected.indexOf(title);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, title);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 5));
		setPage(0);
	};

	const isSelected = (title) => selected.indexOf(title) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	useEffect(() => {
		willBeDeleted.length > 0 && deleteAction(willBeDeleted);
	}, [willBeDeleted]);
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar
					tableTitle={tableTitle}
					deleteAction={setWillBeDeleted}
					numSelected={selected.length}
					selected={selected}
					deleting={deleting}
					addAction={addAction}
				/>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.title);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.title)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.title + index}
											selected={isItemSelected}
										>
											<TableCell
												padding="checkbox"
												style={{ padding: '6px 8px' }}
											>
												<Checkbox
													checked={isItemSelected}
													inputProps={{ 'aria-labelledby': labelId }}
												/>
											</TableCell>
											<TableCell
												component="th"
												id={row.id}
												scope="row"
												padding="none"
											>
												{shortenText(row.title, 70)}
											</TableCell>
											<TableCell align="right">
												<Tooltip title="Edit Section" placement="bottom">
													<IconButton
														color="primary"
														aria-label="Open Editor"
														onClick={(e) => {
															e.stopPropagation();
															editAction(row, index);
														}}
													>
														<EditRoundedIcon />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
				/>
			</Paper>
			{/* <ModalComponent
				contentTitle="Warning"
				contentBody="Do you want to delete item(s)?"
				agreeText="Delete"
				open={isWarningModalOpen}
				setOpen={setIsWarningModalOpen}
				disagreeAction={() => {
					setWillBeDeleted([]);
				}}
				agreeAction={() => {
					deleteAction(willBeDeleted);
				}}
			/> */}
		</div>
	);
}
