import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(180deg, #f5f7fa 0%, #e4e7eb 100%)',
  color: '#333',
  padding: '30px 30px',
  textAlign: 'center',
  borderTop: '2px solid #ff85b4',
  boxShadow: '0 -4px 15px rgba(255, 182, 193, 0.2)',
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  margin: '15px 0',
}));

const SocialIcon = styled('a')(({ theme }) => ({
  color: '#ff85b4',
  fontSize: '22px',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#1a1a1a',
    transform: 'scale(1.2)',
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontSize: '14px',
  opacity: 0.7,
}));

const StoreFooter = () => {
  return (
    <FooterContainer>
      <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 2, color: '#ff85b4' }}>
        BLACKPINK Store
      </Typography>
      <SocialIcons>
        <SocialIcon href="https://instagram.com" target="_blank">
          <FaInstagram />
        </SocialIcon>
        <SocialIcon href="https://twitter.com" target="_blank">
          <FaTwitter />
        </SocialIcon>
        <SocialIcon href="https://youtube.com" target="_blank">
          <FaYoutube />
        </SocialIcon>
      </SocialIcons>
      <FooterText>
        © 2025 BLACKPINK Store. All Rights Reserved.
      </FooterText>
    </FooterContainer>
  );
};

export default StoreFooter;