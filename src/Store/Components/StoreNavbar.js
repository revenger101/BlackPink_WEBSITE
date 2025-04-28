import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box, styled, Typography, Button } from '@mui/material';
import { FaBars, FaShoppingBasket } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import BasketItem from './BasketItem';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: '#fff',
  boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
  padding: '0 40px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
  transition: 'all 0.3s ease',
}));

const StyledLogo = styled('img')(({ theme }) => ({
  height: '50px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const NavLink = styled(Link)(({ theme, isActive }) => ({
  color: isActive ? '#ff5b8e' : '#1a1a1a',
  textDecoration: 'none',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '15px',
  fontWeight: 500,
  margin: '0 25px',
  padding: '8px 0',
  position: 'relative',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#ff5b8e',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: isActive ? '100%' : '0%',
    height: '2px',
    background: '#ff5b8e',
    transition: 'width 0.3s ease',
  },
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: '#1a1a1a',
  margin: '0 25px',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    color: '#ff5b8e',
    backgroundColor: 'transparent',
  },
}));

const BasketBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -8,
  right: -8,
  backgroundColor: '#ff5b8e',
  color: '#fff',
  borderRadius: '50%',
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
}));

const LoginButton = styled(Link)(({ theme }) => ({
  background: '#ff5b8e',
  color: '#fff',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '14px',
  textDecoration: 'none',
  textTransform: 'uppercase',
  padding: '10px 25px',
  borderRadius: '5px',
  boxShadow: '0 2px 10px rgba(255, 91, 142, 0.3)',
  transition: 'all 0.3s ease',
  marginLeft: '25px',
  '&:hover': {
    background: '#e04e7d',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 15px rgba(255, 91, 142, 0.5)',
  },
}));

const BuyButton = styled(Button)(({ theme }) => ({
  background: '#ff5b8e',
  color: '#fff',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '14px',
  textTransform: 'uppercase',
  padding: '10px 0',
  borderRadius: '5px',
  boxShadow: '0 2px 10px rgba(255, 91, 142, 0.3)',
  transition: 'all 0.3s ease',
  width: '100%',
  '&:hover': {
    background: '#e04e7d',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 15px rgba(255, 91, 142, 0.5)',
  },
}));

const Divider = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '24px',
  background: 'rgba(0, 0, 0, 0.1)',
  margin: '0 15px',
}));

// Styled user icon
const UserIcon = styled('img')(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginLeft: '25px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 2px 10px rgba(255, 91, 142, 0.3)',
  },
}));

const StoreNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [basketAnchorEl, setBasketAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { basket, totalPrice, totalItems } = useBasket();

  const menuItems = [
    { label: 'BLACKPINK', href: '/' },
    { label: 'PRODUCTS', href: '/store' },
  ];

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const toggleBasketMenu = (event) => {
    setBasketAnchorEl(event.currentTarget);
    setIsBasketOpen(!isBasketOpen);
  };

  const handleCloseBasket = () => {
    setBasketAnchorEl(null);
    setIsBasketOpen(false);
  };

  const toggleUserMenu = (event) => {
    setUserAnchorEl(event.currentTarget);
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleCloseUserMenu = () => {
    setUserAnchorEl(null);
    setIsUserMenuOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleCloseUserMenu();
    window.location.reload();
  };

  return (
    <StyledAppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">
          <StyledLogo
            src="https://www.blackpinkmusic.com/wp-content/uploads/sites/1847/2022/08/logo.png"
            alt="BLACKPINK Logo"
          />
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {menuItems.map((item, index) => (
            <Box key={item.label} sx={{ display: 'flex', alignItems: 'center' }}>
              <NavLink to={item.href} isActive={location.pathname === item.href}>
                {item.label}
              </NavLink>
              {index < menuItems.length - 1 && <Divider />}
            </Box>
          ))}
          <Divider />
          <IconButtonStyled onClick={toggleBasketMenu}>
            <FaShoppingBasket size={20} />
            {totalItems > 0 && <BasketBadge>{totalItems}</BasketBadge>}
          </IconButtonStyled>
          <Menu
            anchorEl={basketAnchorEl}
            open={isBasketOpen}
            onClose={handleCloseBasket}
            PaperProps={{
              sx: {
                background: '#fff',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                width: '320px',
                maxHeight: '400px',
                overflowY: 'auto',
                borderRadius: '8px',
                padding: '10px',
              },
            }}
          >
            {basket.length === 0 ? (
              <MenuItem>
                <Typography sx={{ fontFamily: "'Montserrat', sans-serif", color: '#666', width: '100%', textAlign: 'center' }}>
                  Your basket is empty.
                </Typography>
              </MenuItem>
            ) : (
              <>
                {basket.map((item) => (
                  <MenuItem key={item.id} sx={{ padding: 0, mb: 1 }}>
                    <BasketItem item={item} />
                  </MenuItem>
                ))}
                <MenuItem sx={{ padding: 0 }}>
                  <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: '#1a1a1a', mb: 1 }}
                    >
                      Total: ${totalPrice.toFixed(2)}
                    </Typography>
                    <BuyButton component={Link} to="/buy" state={{ basket, totalPrice }} onClick={handleCloseBasket}>
                      Proceed to Buy
                    </BuyButton>
                  </Box>
                </MenuItem>
              </>
            )}
          </Menu>
          <Divider />
          {isLoggedIn ? (
            <>
              <IconButtonStyled onClick={toggleUserMenu}>
                <UserIcon
                  src="https://robohash.org/user?set=set4&size=40x40"
                  alt="User Icon"
                />
              </IconButtonStyled>
              <Menu
                anchorEl={userAnchorEl}
                open={isUserMenuOpen}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: {
                    background: '#fff',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    width: '200px',
                    mt: 1,
                  },
                }}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '14px',
                    color: '#1a1a1a',
                    padding: '12px 20px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: '#f9f9f9',
                      color: '#ff5b8e',
                    },
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '14px',
                    color: '#1a1a1a',
                    padding: '12px 20px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: '#f9f9f9',
                      color: '#ff5b8e',
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <LoginButton to="/signin" onClick={handleLogin}>
              Login
            </LoginButton>
          )}
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton onClick={toggleMenu} sx={{ color: '#ff5b8e' }}>
            <FaBars />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleCloseMenu}
            PaperProps={{
              sx: {
                background: '#fff',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
              },
            }}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.label} onClick={handleCloseMenu}>
                <NavLink
                  to={item.href}
                  sx={{ color: '#ff5b8e', width: '100%' }}
                  isActive={location.pathname === item.href}
                >
                  {item.label}
                </NavLink>
              </MenuItem>
            ))}
            <MenuItem onClick={handleCloseMenu}>
              <NavLink to="/store" sx={{ color: '#ff5b8e', width: '100%' }}>
                BASKET {totalItems > 0 && `(${totalItems})`}
              </NavLink>
            </MenuItem>
            {isLoggedIn ? (
              <>
                <MenuItem onClick={handleCloseMenu}>
                  <NavLink to="#" sx={{ color: '#ff5b8e', width: '100%' }}>
                    PROFILE
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <NavLink to="#" sx={{ color: '#ff5b8e', width: '100%' }}>
                    LOGOUT
                  </NavLink>
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleCloseMenu}>
                <NavLink to="/signin" sx={{ color: '#ff5b8e', width: '100%' }} onClick={handleLogin}>
                  LOGIN
                </NavLink>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default StoreNavbar;