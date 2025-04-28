import React from 'react';
import { Box, Typography, Card, CardMedia, styled } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const ScrollerContainer = styled(Box)(({ theme }) => ({
  padding: '40px 20px',
  background: 'linear-gradient(90deg, #1a1a1a 0%, #2c2c2c 100%)',
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  scrollMarginTop: '64px',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.2) 0%, transparent 70%)',
    zIndex: 0,
  },
}));

const ScrollerTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 900,
  fontSize: '3rem',
  color: '#ff69b4',
  textAlign: 'center',
  marginBottom: '30px',
  textShadow: '0 0 15px rgba(255, 105, 180, 0.7)',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  animation: 'glow 2s infinite alternate',
  '@keyframes glow': {
    '0%': { textShadow: '0 0 15px rgba(255, 105, 180, 0.7)' },
    '100%': { textShadow: '0 0 20px rgba(255, 105, 180, 1)' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const ScrollerTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: '20px',
  padding: '20px',
  scrollBehavior: 'smooth',
  scrollbarWidth: 'thin', // Firefox
  scrollbarColor: '#ff69b4 #1a1a1a', // Firefox
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#1a1a1a',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#ff69b4',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(255, 105, 180, 0.7)',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#ff85c0',
  },
}));

const ScrollerCard = styled(Card)(({ theme }) => ({
  flex: '0 0 250px',
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#fff',
  borderRadius: '15px',
  overflow: 'hidden',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  border: '2px solid transparent',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(255, 105, 180, 0.5)',
    border: '2px solid #ff69b4',
  },
}));

const ScrollerImage = styled(CardMedia)(({ theme }) => ({
  height: '200px',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 500,
  fontSize: '1.2rem',
  color: '#ff69b4',
  textAlign: 'center',
  padding: '10px',
}));

const FadeInBox = styled(Box)(({ inView }) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(20px)',
  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
}));

// Sample data for the scroller (representing the 4 members)
const scrollerData = [
  { name: 'Jisoo', image: 'https://i.pinimg.com/736x/aa/88/45/aa8845a3614657f16d2701d3e0c9fd15.jpg' },
  { name: 'Jennie', image: 'https://i.pinimg.com/736x/ce/7e/60/ce7e602777e153fee9ff045b0e7dc6ea.jpg' },
  { name: 'Rosé', image: 'https://i.pinimg.com/736x/b6/6c/9c/b66c9cf2957533086626869342fd45b1.jpg' },
  { name: 'Lisa', image: 'https://i.pinimg.com/736x/43/58/ef/4358ef245f58bf3ae626eb742c3eace4.jpg' },
];

const BlackpinkScroller = ({ id }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <ScrollerContainer id={id} ref={ref}>
      <FadeInBox inView={inView}>
        <ScrollerTitle variant="h2">BLACKPINK Members</ScrollerTitle>
        <ScrollerTrack>
          {scrollerData.map((item, index) => (
            <ScrollerCard key={index}>
              <ScrollerImage component="img" image={item.image} alt={item.name} />
              <CardTitle>{item.name}</CardTitle>
            </ScrollerCard>
          ))}
        </ScrollerTrack>
      </FadeInBox>
    </ScrollerContainer>
  );
};

export default BlackpinkScroller;