import React from 'react';
import { Box, Typography, IconButton, styled } from '@mui/material';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from 'react-icons/fa';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(https://shop.blackpinkmusic.com/cdn/shop/files/BLKPNK-0043_EvergreenStoreRefreshFooter.png?v=1696914434&width=2000)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  boxShadow: '0 -4px 15px rgba(255, 105, 180, 0.3)', // Pink glow at the top
  padding: '10px 50px', // Increased padding for better spacing
  textAlign: 'left', // Align content to the left
  color: '#fff',
  position: 'relative',
  bottom: 0,
  width: '100%',
  marginTop: 'auto', // Pushes footer to the bottom of the page
  minHeight: '150px', // Ensure the footer has enough height to display the background image
  [theme.breakpoints.down('sm')]: {
    padding: '10px 20px', // Reduced padding on mobile
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#ff69b4',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  margin: '0 15px 0 0', // Adjusted margin to space icons horizontally
  padding: '10px',
  borderRadius: '50%',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 105, 180, 0.3)',
    transform: 'scale(1.2)',
  },
}));

const Footer = () => {
  const socialLinks = [
    { icon: <FaInstagram />, href: 'https://www.instagram.com/blackpinkofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { icon: <FaTiktok />, href: 'https://www.tiktok.com/@bp_tiktok?lang=en' },
    { icon: <FaYoutube />, href: 'https://www.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A' },
    { icon: <FaFacebook />, href: 'https://www.facebook.com/BLACKPINKOFFICIAL' },
  ];

  return (
    <StyledFooter>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "'Roboto', sans-serif",
          color: '#ff69b4',
          marginBottom: '15px',
          fontWeight: 600, // Slightly bolder for better readability
        }}
      >
        Follow BLACKPINK
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {socialLinks.map((link, index) => (
          <SocialIcon
            key={index}
            component="a"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </SocialIcon>
        ))}
      </Box>
      <Typography
        variant="caption"
        sx={{
          fontFamily: "'Roboto', sans-serif",
          color: '#fff',
          opacity: 0.9, // Slightly reduced opacity for contrast
        }}
      >
        © 2025 BLACKPINK. All Rights Reserved.
      </Typography>
    </StyledFooter>
  );
};

export default Footer;