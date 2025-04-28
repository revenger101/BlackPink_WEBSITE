import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, styled } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import blackpinkData from '../Assets/Data/blackpink_data.json';

const eventImages = {
  'Debut with Square One': 'https://www.billboard.com/wp-content/uploads/2022/12/blackpink-concert-LA-nov-2022-billboard-1-1548.jpg?w=875&h=583&crop=1',
  'Coachella 2019 Performance': 'https://i.pinimg.com/736x/a3/85/55/a38555dac9884194465e2df1980e507f.jpg',
  'The Show Livestream Concert': 'https://i.pinimg.com/736x/8f/41/c6/8f41c6c739530da8371e578c421a99d3.jpg',
  'Born Pink World Tour Start': 'https://i.pinimg.com/736x/aa/88/45/aa8845a3614657f16d2701d3e0c9fd15.jpg',
  'Coachella 2023 Headline': 'https://i.pinimg.com/736x/ce/7e/60/ce7e602777e153fee9ff045b0e7dc6ea.jpg',
  '2025 World Tour - Inglewood': 'https://i.pinimg.com/736x/b6/6c/9c/b66c9cf2957533086626869342fd45b1.jpg',
  '2025 World Tour - St Denis': 'https://i.pinimg.com/736x/43/58/ef/4358ef245f58bf3ae626eb742c3eace4.jpg',
};

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '60px 20px',
  background: 'linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%)',
  color: '#fff',
  position: 'relative',
  overflow: 'visible',
  scrollMarginTop: '64px',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 50% 0%, rgba(255, 105, 180, 0.2) 0%, transparent 70%)',
    zIndex: 0,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
  // Add light beams in the background
  '& .light-beams': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  '& .beam': {
    position: 'absolute',
    width: '2px',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(255, 105, 180, 0) 0%, rgba(255, 105, 180, 0.5) 50%, rgba(255, 105, 180, 0) 100%)',
    opacity: 0.3,
    animation: 'beamMove 10s infinite linear',
    '&:nth-child(1)': { left: '20%', animationDelay: '0s' },
    '&:nth-child(2)': { left: '50%', animationDelay: '2s' },
    '&:nth-child(3)': { left: '80%', animationDelay: '4s' },
  },
  '@keyframes beamMove': {
    '0%': { transform: 'translateY(-100%)' },
    '100%': { transform: 'translateY(100%)' },
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 900,
  fontSize: '3.5rem',
  color: '#ff69b4',
  textAlign: 'center',
  marginBottom: '60px',
  textShadow: '0 0 15px rgba(255, 105, 180, 0.7)',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  animation: 'glow 2s infinite alternate',
  '@keyframes glow': {
    '0%': { textShadow: '0 0 15px rgba(255, 105, 180, 0.7)' },
    '100%': { textShadow: '0 0 20px rgba(255, 105, 180, 1)' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const EventsTimeline = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '1200px',
  margin: '0 auto',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '6px',
    height: '100%',
    background: 'repeating-linear-gradient(to bottom, #ff69b4 0, #ff69b4 10px, transparent 10px, transparent 20px)',
    boxShadow: '0 0 15px rgba(255, 105, 180, 0.7)',
    transform: 'translateX(-50%)',
    zIndex: 1,
    animation: 'flow 5s linear infinite',
  },
  '& .timeline-ornament': {
    position: 'absolute',
    left: '50%',
    width: '16px',
    height: '16px',
    background: '#ff69b4',
    transform: 'translateX(-50%) rotate(45deg)',
    zIndex: 2,
    boxShadow: '0 0 10px rgba(255, 105, 180, 0.8)',
    animation: 'pulse 2s infinite',
  },
  '@keyframes flow': {
    '0%': { backgroundPosition: '0 0' },
    '100%': { backgroundPosition: '0 20px' },
  },
  '@keyframes pulse': {
    '0%': { transform: 'translateX(-50%) rotate(45deg) scale(1)', boxShadow: '0 0 10px rgba(255, 105, 180, 0.8)' },
    '50%': { transform: 'translateX(-50%) rotate(45deg) scale(1.2)', boxShadow: '0 0 15px rgba(255, 105, 180, 1)' },
    '100%': { transform: 'translateX(-50%) rotate(45deg) scale(1)', boxShadow: '0 0 10px rgba(255, 105, 180, 0.8)' },
  },
  [theme.breakpoints.down('md')]: {
    '&:before': {
      left: '20px',
    },
    '& .timeline-ornament': {
      left: '20px',
    },
  },
}));

const EventCard = styled(Card)(({ theme, index }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#fff',
  borderRadius: '15px',
  overflow: 'hidden',
  position: 'relative',
  width: '45%',
  margin: '60px 0',
  marginLeft: index % 2 === 0 ? 'auto' : '0',
  marginRight: index % 2 === 0 ? '0' : 'auto',
  zIndex: 2,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
  transform: index % 2 === 0 ? 'rotate(2deg)' : 'rotate(-2deg)',
  border: '2px solid transparent',
  '&:hover': {
    transform: 'translateY(-5px) rotate(0deg) scale(1.02)',
    boxShadow: '0 10px 20px rgba(255, 105, 180, 0.5), 0 0 30px rgba(255, 105, 180, 0.3)',
    border: '2px solid #ff69b4',
    '& .card-particles': {
      opacity: 1,
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    width: '24px',
    height: '24px',
    background: '#ff69b4',
    borderRadius: '50%',
    zIndex: 3,
    transform: 'translateY(-50%)',
    boxShadow: '0 0 15px rgba(255, 105, 180, 0.8)',
    animation: 'pulse 2s infinite',
    [index % 2 === 0 ? 'left' : 'right']: '-42px',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    [index % 2 === 0 ? 'left' : 'right']: '-20px',
    width: '20px',
    height: '2px',
    background: '#ff69b4',
    zIndex: 2,
  },
  '& .arrow': {
    position: 'absolute',
    top: '50%',
    width: '30px',
    height: '30px',
    background: 'rgba(255, 105, 180, 0.8)',
    clipPath: index % 2 === 0 ? 'polygon(0 0, 100% 50%, 0 100%)' : 'polygon(100% 0, 0 50%, 100% 100%)',
    zIndex: 3,
    transform: 'translateY(-50%)',
    [index % 2 === 0 ? 'right' : 'left']: '-50px',
    animation: 'bounce 1.5s infinite',
  },
  '& .card-particles': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
    pointerEvents: 'none',
  },
  '& .card-particle': {
    position: 'absolute',
    width: '3px',
    height: '3px',
    background: '#ff69b4',
    borderRadius: '50%',
    boxShadow: '0 0 5px rgba(255, 105, 180, 0.5)',
    animation: 'float 2s infinite linear',
  },
  '@keyframes pulse': {
    '0%': { transform: 'translateY(-50%) scale(1)', boxShadow: '0 0 15px rgba(255, 105, 180, 0.8)' },
    '50%': { transform: 'translateY(-50%) scale(1.2)', boxShadow: '0 0 25px rgba(255, 105, 180, 1)' },
    '100%': { transform: 'translateY(-50%) scale(1)', boxShadow: '0 0 15px rgba(255, 105, 180, 0.8)' },
  },
  '@keyframes bounce': {
    '0%': { transform: 'translateY(-50%) translateX(0)' },
    '50%': { transform: `translateY(-50%) translateX(${index % 2 === 0 ? '5px' : '-5px'})` },
    '100%': { transform: 'translateY(-50%) translateX(0)' },
  },
  '@keyframes float': {
    '0%': { transform: 'translate(0, 0)', opacity: 0.5 },
    '100%': { transform: 'translate(50px, 50px)', opacity: 0 },
  },
  [theme.breakpoints.down('md')]: {
    width: '80%',
    marginLeft: '40px',
    marginRight: '0',
    transform: 'rotate(0deg)',
    '&:before': {
      left: '-22px',
      right: 'auto',
    },
    '&:after': {
      left: '0',
      right: 'auto',
    },
    '& .arrow': {
      left: '-30px',
      right: 'auto',
      clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
    },
  },
}));

const EventImage = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  minHeight: '200px',
  objectFit: 'contain',
  transition: 'transform 0.3s ease',
  backgroundColor: '#1a1a1a',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '150px',
  },
}));

const EventContent = styled(CardContent)(({ theme }) => ({
  padding: '20px',
  background: 'rgba(0, 0, 0, 0.3)',
}));

const EventTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 500,
  fontSize: '1.3rem',
  color: '#ff69b4',
  marginBottom: '10px',
}));

const EventText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontSize: '1rem',
  color: '#fff',
  opacity: 0.9,
}));

const FadeInBox = styled(Box)(({ inView }) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(20px)',
  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
  minHeight: '200px',
}));

const Events = ({ id }) => {
  const { events } = blackpinkData;
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  // Calculate positions for timeline ornaments (one per event card)
  const ornamentPositions = events.map((_, index) => {
    const totalEvents = events.length;
    const positionPercentage = (index + 0.5) * (100 / totalEvents); // Center ornament in each event segment
    return positionPercentage;
  });

  return (
    <SectionContainer id={id} ref={ref}>
      <FadeInBox inView={inView}>
        {/* Add light beams */}
        <Box className="light-beams">
          <Box className="beam" />
          <Box className="beam" />
          <Box className="beam" />
        </Box>
        <SectionTitle variant="h2">Key Events</SectionTitle>
        <EventsTimeline>
          {events && events.length > 0 ? (
            events.map((event, index) => (
              <React.Fragment key={index}>
                {/* Timeline Ornament */}
                <Box
                  className="timeline-ornament"
                  sx={{ top: `${ornamentPositions[index]}%` }}
                />
                {/* Event Card */}
                <EventCard index={index}>
                  <Box className="arrow" />
                  <EventImage
                    component="img"
                    image={eventImages[event.title]}
                    alt={event.title}
                  />
                  <EventContent>
                    <EventTitle variant="h6">{event.title}</EventTitle>
                    <EventText>Date: {event.date}</EventText>
                    <EventText>{event.description}</EventText>
                  </EventContent>
                  {/* Add particles on hover */}
                  <Box className="card-particles">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Box
                        key={i}
                        className="card-particle"
                        sx={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </Box>
                </EventCard>
              </React.Fragment>
            ))
          ) : (
            <Typography color="error">No events data available</Typography>
          )}
        </EventsTimeline>
      </FadeInBox>
    </SectionContainer>
  );
};

export default Events;