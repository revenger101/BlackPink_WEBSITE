import React from 'react';
import { Box, styled } from '@mui/material';

const SpinnerContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column', // Stack spinner and text vertically
  justifyContent: 'center',
  alignItems: 'center',
  background: 'transparent',
  zIndex: 9999, // Ensure it's above all other content
  backdropFilter: 'blur(5px)', // Add blur effect to background
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.4) 0%, transparent 70%), rgba(26, 26, 26, 0.98)', // Slightly darker and more opaque
    animation: 'backgroundGradientShift 6s infinite alternate', // Dynamic gradient shift
    zIndex: -1,
  },
  '@keyframes backgroundGradientShift': {
    '0%': { background: 'radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.4) 0%, transparent 70%), rgba(26, 26, 26, 0.98)' },
    '100%': { background: 'radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.6) 0%, transparent 70%), rgba(26, 26, 26, 0.98)' },
  },
}));

const SpinnerWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '60px',
  height: '60px',
  animation: 'wrapperPulse 2s infinite ease-in-out', // Subtle pulse effect
  '@keyframes wrapperPulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  },
  // Add glowing ring effect around the spinner
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'transparent',
    boxShadow: '0 0 20px rgba(255, 105, 180, 0.5), inset 0 0 10px rgba(255, 105, 180, 0.3)',
    animation: 'glowRing 2s infinite alternate',
  },
  '@keyframes glowRing': {
    '0%': { boxShadow: '0 0 20px rgba(255, 105, 180, 0.5), inset 0 0 10px rgba(255, 105, 180, 0.3)' },
    '100%': { boxShadow: '0 0 30px rgba(255, 105, 180, 0.8), inset 0 0 15px rgba(255, 105, 180, 0.5)' },
  },
  [theme.breakpoints.down('sm')]: {
    width: '50px',
    height: '50px',
    '&:before': {
      width: '70px',
      height: '70px',
      top: '-10px',
      left: '-10px',
    },
  },
}));

const SpinnerArc = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: '4px solid transparent',
  borderTopColor: '#ff69b4', // Pink arc
  borderRightColor: '#ff69b4',
  borderRadius: '50%',
  animation: 'spin 1.2s linear infinite',
  '&:nth-of-type(2)': {
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ff69b4',
    borderLeftColor: '#ff69b4',
    animation: 'spinReverse 1.2s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  '@keyframes spinReverse': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(-360deg)' },
  },
  [theme.breakpoints.down('sm')]: {
    borderWidth: '3px',
  },
}));

const SpinnerText = styled(Box)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '18px',
  fontWeight: 600,
  color: '#ff69b4',
  textTransform: 'uppercase',
  letterSpacing: '3px', // Modern letter spacing
  marginTop: '20px',
  opacity: 0.9,
  animation: 'textFade 2s infinite ease-in-out',
  '@keyframes textFade': {
    '0%': { opacity: 0.9, transform: 'translateY(0)' },
    '50%': { opacity: 1, transform: 'translateY(-2px)' },
    '100%': { opacity: 0.9, transform: 'translateY(0)' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    letterSpacing: '2px',
    marginTop: '15px',
  },
}));

const BlackpinkSpinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerWrapper>
        <SpinnerArc />
        <SpinnerArc />
      </SpinnerWrapper>
      <SpinnerText>Loading...</SpinnerText>
    </SpinnerContainer>
  );
};

export default BlackpinkSpinner;