import { useState, useEffect, useContext } from 'react';
import { useStyles } from './AppBar.style';
import { AppBarProps } from './AppBar.types';
import { useHistory, useRouteMatch } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import UserContext from '../../contexts/user/context';

import { setUser } from '../../contexts/user/dispatchController';
let pages = [
	{ label: 'Home', route: '/home' },
	{ label: 'Search', route: '/search' },
];

const AppBarComponent = () => {
	const classes = useStyles();
	//@ts-ignore
	const { user, userDispatch } = useContext(UserContext);
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const history = useHistory();
	const [activeRoute, setActiveRoute] = useState('/');
	const match: any = useRouteMatch('*');

	if (user.role === 'manager') {
		if (!pages.filter((el) => el.route === '/app-data').length) {
			pages.push({ label: 'App Data', route: '/app-data' });
		}
		if (!pages.filter((el) => el.route === '/reservations').length) {
			pages.push({ label: 'Reservations', route: '/reservations' });
		}
	} else {
		pages = pages.filter(
			(el) => el.route !== '/app-data' && el.route !== '/reservations'
		);
	}

	useEffect(() => {
		if (match.url !== activeRoute) {
			if (match.url.lastIndexOf('/') > 0) {
				setActiveRoute('/' + match.url.split('/')[1]);
			} else {
				setActiveRoute(match.url);
			}
		}
	}, [match.url]);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const routePush = (newRoute: string) => {
		if (newRoute !== activeRoute) {
			history.push(newRoute);
		}
	};

	const handleLogout = () => {
		userDispatch(setUser(null));
		localStorage.removeItem('userContextValue');
		history.push('/login');
	};
	return (
		<AppBar
			position="fixed"
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: 68.5 }}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters style={{ height: '68.5px' }}>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
					>
						<img
							className={classes.avatar}
							src="/bikyMini.png"
							alt="Biky Logo"
						/>
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
							style={{ padding: '6px 8px' }}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'flex', md: 'none' },
								flexDirection: { xs: 'column' },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									style={{ padding: 5 }}
									key={page.label}
									onClick={() => {
										handleCloseNavMenu();
										routePush(page.route);
									}}
								>
									<Typography textAlign="center">{page.label}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
					>
						<img
							className={classes.avatar}
							src="/bikyMini.png"
							alt="Biky Logo"
						/>
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page.label}
								onClick={() => {
									handleCloseNavMenu();
									routePush(page.route);
								}}
								sx={{ my: 2, color: 'white', display: 'block' }}
								style={{
									padding: '6px 8px',
									borderRadius: 10,
									color: activeRoute === page.route ? 'white' : '#abcffc',
								}}
							>
								{page.label}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0, display: 'flex' }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp">
									{user.firstName[0] + user.lastName[0]}
								</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleLogout}>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default AppBarComponent;
