import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, styled, IconButton } from '@mui/material';
import { FaInstagram, FaYoutube, FaTiktok, FaFacebook, FaChevronDown } from 'react-icons/fa';
import Image from '../Assets/Images/blackpink.jpg'; // Ensure this path is correct

// Styled components
const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 'calc(100vh - 64px)',
  backgroundImage: `url(${Image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: '#fff',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.2) 0%, transparent 70%)',
    zIndex: 1,
  },
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 56px)',
    backgroundAttachment: 'scroll',
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: '0 30px',
  animation: 'fadeIn 1.5s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 20px',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 900,
  fontSize: '4.5rem',
  color: '#ff69b4',
  textShadow: '0 0 15px rgba(255, 105, 180, 0.7)',
  marginBottom: '20px',
  animation: 'glow 2s infinite alternate',
  '@keyframes glow': {
    '0%': { textShadow: '0 0 15px rgba(255, 105, 180, 0.7)' },
    '100%': { textShadow: '0 0 25px rgba(255, 105, 180, 1)' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '3rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 400,
  fontSize: '1.8rem',
  marginBottom: '20px',
  opacity: 0.9,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.4rem',
  },
}));

const Tagline = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '1.5rem',
  color: '#fff',
  marginBottom: '30px',
  height: '1.5rem',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
    height: '1.2rem',
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff69b4 30%, #fff 90%)',
  color: '#1a1a1a',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: '1.2rem',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  padding: '12px 35px',
  borderRadius: '25px',
  boxShadow: '0 0 15px rgba(255, 105, 180, 0.5)',
  margin: '0 10px',
  animation: 'pulse 2s infinite ease-in-out',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 25px rgba(255, 105, 180, 0.8)',
    background: 'linear-gradient(45deg, #ff69b4 30%, #fff 90%)',
  },

  '@keyframes pulse': {
    '0%': { boxShadow: '0 0 15px rgba(255, 105, 180, 0.5)' },
    '50%': { boxShadow: '0 0 25px rgba(255, 105, 180, 0.8)' },
    '100%': { boxShadow: '0 0 15px rgba(255, 105, 180, 0.5)' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    padding: '10px 25px',
    margin: '5px 0',
  },
}));

const SecondaryCTAButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  border: '2px solid #ff69b4',
  color: '#ff69b4',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: '1.2rem',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  padding: '10px 30px',
  borderRadius: '25px',
  transition: 'all 0.3s ease',
  margin: '0 10px',
  '&:hover': {
    background: '#ff69b4',
    color: '#1a1a1a',
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    padding: '8px 20px',
    margin: '5px 0',
  },
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '30px',
  zIndex: 2,
  [theme.breakpoints.down('sm')]: {
    gap: '15px',
    marginTop: '20px',
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#ff69b4',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  padding: '12px',
  borderRadius: '50%',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 105, 180, 0.3)',
    transform: 'scale(1.2)',
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginTop: '40px',
  zIndex: 2,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '20px',
    marginTop: '30px',
  },
}));

const StatItem = styled(Box)(() => ({
  textAlign: 'center',
  color: '#fff',
  animation: 'fadeInStats 2s ease-in-out',
  '@keyframes fadeInStats': {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: '2rem',
  color: '#ff69b4',
}));

const StatLabel = styled(Typography)(() => ({
  fontFamily: "'Roboto', sans-serif",
  fontSize: '1rem',
  opacity: 0.8,
}));

const ScrollIndicator = styled(Box)(() => ({
  position: 'absolute',
  bottom: '30px',
  zIndex: 2,
  animation: 'bounce 2s infinite ease-in-out',
  '@keyframes bounce': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
}));

// Component
const HeroSection = () => {
  const [taglines] = useState([
    'Empowering Fans Worldwide',
    'Experience the K-pop Revolution',
    'Join the Movement Today',
  ]);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>BLACKPINK</HeroTitle>
        <HeroSubtitle>Born to Shine, Built to Slay</HeroSubtitle>
        <Tagline>{taglines[currentTaglineIndex]}</Tagline>
        <Box>
        <CTAButton 
            onClick={() => {
              // Add your join functionality here
              console.log("Join Us button clicked");
              // Example: window.location.href = '/signup';
              // Or trigger a modal: setShowJoinModal(true);
            }}
            variant="contained"
            disableRipple
          >
            Join Us
          </CTAButton>
          <SecondaryCTAButton>Learn More</SecondaryCTAButton>
        </Box>
        <SocialIcons>
          <SocialIcon><FaInstagram /></SocialIcon>
          <SocialIcon><FaYoutube /></SocialIcon>
          <SocialIcon><FaTiktok /></SocialIcon>
          <SocialIcon><FaFacebook /></SocialIcon>
        </SocialIcons>
        <StatsContainer>
          <StatItem>
            <StatNumber>85M+</StatNumber>
            <StatLabel>YouTube Subscribers</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>40M+</StatNumber>
            <StatLabel>Spotify Monthly Listeners</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>100+</StatNumber>
            <StatLabel>Countries Reached</StatLabel>
          </StatItem>
        </StatsContainer>
      </HeroContent>
      <ScrollIndicator>
        <FaChevronDown size={30} color="#ff69b4" />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
