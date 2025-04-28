import React, { useState, useEffect, useMemo } from 'react';
import {
  AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Fade, styled, Button,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Added FaTimes for closing the menu

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, rgba(26, 26, 26, 0.9) 0%, rgba(44, 44, 44, 0.9) 100%)',
  backdropFilter: 'blur(8px)', // Glassmorphism effect
  boxShadow: '0 4px 15px rgba(255, 105, 180, 0.3)',
  padding: '0 30px', // Increased padding for a more spacious look
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
  '&.scrolled': {
    background: 'linear-gradient(90deg, rgba(26, 26, 26, 0.95) 0%, rgba(44, 44, 44, 0.95) 100%)',
    boxShadow: '0 6px 20px rgba(255, 105, 180, 0.5)',
    backdropFilter: 'blur(12px)', // Enhanced blur on scroll
  },
  [theme.breakpoints.down('md')]: {
    padding: '0 20px',
  },
}));

const StyledLogo = styled('img')(({ theme }) => ({
  height: '45px', // Slightly larger logo
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'rotate(5deg) scale(1.1)', // Added rotation for a playful effect
  },
  [theme.breakpoints.down('md')]: {
    height: '40px',
  },
}));

const StyledNavLink = styled(Link)(({ theme, isActive }) => ({
  color: isActive ? '#fff' : '#ff69b4',
  textDecoration: 'none',
  fontFamily: "'Montserrat', sans-serif", // Changed to Montserrat for consistency
  fontSize: '18px', // Slightly larger font
  fontWeight: 600, // Bolder for a premium feel
  letterSpacing: '1px', // Added letter spacing
  margin: '0 20px', // Increased spacing between links
  padding: '8px 12px',
  borderRadius: '25px',
  position: 'relative',
  transition: 'color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    color: '#fff',
    transform: 'scale(1.05)', // Subtle scale on hover
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-5px',
    left: '50%',
    width: isActive ? '70%' : '0%',
    height: '3px', // Thicker underline
    background: isActive
      ? 'linear-gradient(90deg, #ff69b4, #fff)' // Gradient underline for active link
      : 'linear-gradient(90deg, #ff69b4, #fff)', // Gradient on hover
    boxShadow: '0 0 8px rgba(255, 105, 180, 0.8)',
    transition: 'width 0.3s ease, left 0.3s ease, box-shadow 0.3s ease',
    transform: 'translateX(-50%)',
  },
  '&:hover:after': {
    width: '70%', // Underline expands on hover
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    margin: '0 15px',
    padding: '6px 10px',
  },
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff69b4, #fff)', // Gradient button
  color: '#1a1a1a',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'uppercase',
  padding: '8px 20px',
  borderRadius: '25px',
  boxShadow: '0 0 10px rgba(255, 105, 180, 0.5)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 15px rgba(255, 105, 180, 0.8)',
    background: 'linear-gradient(45deg, #fff, #ff69b4)', // Reverse gradient on hover
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    padding: '6px 15px',
  },
}));

const HamburgerIcon = styled(IconButton)(({ theme, isMenuOpen }) => ({
  color: '#ff69b4',
  position: 'relative',
  '& svg': {
    transition: 'transform 0.3s ease',
    transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)', // Rotate icon on open/close
  },
  [theme.breakpoints.up('md')]: {
    display: 'none', // Hide on desktop
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'linear-gradient(180deg, #1a1a1a 0%, #2c2c2c 100%)',
    boxShadow: '0 4px 15px rgba(255, 105, 180, 0.3)',
    borderRadius: '15px',
    width: '100%', // Full width on mobile
    maxWidth: '300px', // Constrain width for better appearance
    marginTop: '10px',
    transformOrigin: 'top right',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme, isActive }) => ({
  padding: '12px 20px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(90deg, rgba(255, 105, 180, 0.2), rgba(255, 255, 255, 0.1))',
    transform: 'translateX(5px)', // Slide effect on hover
  },
  '& a': {
    color: isActive ? '#fff' : '#ff69b4',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '16px',
    fontWeight: 500,
    textDecoration: 'none',
    width: '100%',
  },
}));

const Navbar = ({ onSubscribeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state
  const location = useLocation();

  const menuItems = useMemo(
    () => [
      { label: 'MEMBERS', href: '#Members' },
      { label: 'EVENTS', href: '#Events' },
      { label: 'SONGS', href: '#Songs' },
      { label: 'STORE', href: '/store' },
    ],
    []
  );

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -150px 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeSections = () => {
      menuItems.forEach((item) => {
        if (item.href.startsWith('#')) {
          const sectionId = item.href.replace('#', '');
          const section = document.getElementById(sectionId);
          if (section) {
            observer.observe(section);
          }
        }
      });
    };

    setTimeout(observeSections, 100);

    return () => observer.disconnect();
  }, [menuItems]);

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleNavClick = (event, item) => {
    event.preventDefault();
    if (item.href.startsWith('#')) {
      const targetId = item.href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const navbarHeight = 64;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: 'smooth',
        });
        setActiveSection(targetId);
      }
    }
    handleClose();
  };

  return (
    <StyledAppBar className={isScrolled ? 'scrolled' : ''}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <a href="/">
          <StyledLogo
            src="https://www.blackpinkmusic.com/wp-content/uploads/sites/1847/2022/08/logo.png"
            alt="BLACKPINK Logo"
          />
        </a>

        {/* Desktop Nav Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {menuItems.map((item) => (
            <StyledNavLink
              key={item.label}
              to={item.href}
              onClick={(e) => item.href.startsWith('#') && handleNavClick(e, item)}
              isActive={
                item.href === '/store'
                  ? location.pathname === item.href
                  : activeSection === item.href.replace('#', '')
              }
            >
              {item.label}
            </StyledNavLink>
          ))}
          {/* Subscribe Button (Desktop) */}
          <SubscribeButton onClick={onSubscribeClick}>
            Subscribe
          </SubscribeButton>
        </Box>

        {/* Mobile Hamburger Menu */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <HamburgerIcon onClick={toggleMenu} isMenuOpen={isMenuOpen}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </HamburgerIcon>
          <StyledMenu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleClose}
            TransitionComponent={Fade}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {menuItems.map((item) => (
              <StyledMenuItem
                key={item.label}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    handleNavClick(e, item);
                  } else {
                    handleClose();
                  }
                }}
                isActive={
                  item.href === '/store'
                    ? location.pathname === item.href
                    : activeSection === item.href.replace('#', '')
                }
              >
                <StyledNavLink
                  to={item.href}
                  sx={{ color: '#ff69b4', width: '100%' }}
                  isActive={
                    item.href === '/store'
                      ? location.pathname === item.href
                      : activeSection === item.href.replace('#', '')
                  }
                >
                  {item.label}
                </StyledNavLink>
              </StyledMenuItem>
            ))}
            {/* Subscribe Button (Mobile) */}
            <StyledMenuItem onClick={() => { onSubscribeClick(); handleClose(); }}>
              <Box sx={{ color: '#ff69b4', fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 500 }}>
                SUBSCRIBE
              </Box>
            </StyledMenuItem>
          </StyledMenu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;