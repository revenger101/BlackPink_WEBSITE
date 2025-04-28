import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, styled } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import HeroSection from '../Components/HeroSection';
import Events from '../Components/Events';
import Songs from '../Components/Songs';
import Subscribe from '../Components/Subscribe';
import Navbar from '../Components/Navbar';
import blackpinkData from '../Assets/Data/blackpink_data.json';

const memberImages = {
  Jisoo: require('../Assets/Images/jisoo.jpg'),
  Jennie: require('../Assets/Images/jennie.jpg'),
  Rosé: require('../Assets/Images/rose.jpg'),
  Lisa: require('../Assets/Images/lisa.jpg'),
};

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '60px 20px',
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
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
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

const MembersCardGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  gap: '40px',
  maxWidth: '1200px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
  padding: '0 20px',
}));

const MemberCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#fff',
  borderRadius: '20px',
  overflow: 'hidden',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  flex: '0 0 270px',
  border: '2px solid transparent',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(255, 105, 180, 0.4)',
    border: '2px solid #ff69b4',
  },
  '&:hover .member-image': {
    transform: 'scale(1.05)',
  },
  '&:hover .card-content': {
    backgroundColor: 'rgba(255, 105, 180, 0.1)',
  },
}));

const MemberImage = styled(CardMedia)(({ theme }) => ({
  height: '350px',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  borderBottom: '3px solid #ff69b4',
  [theme.breakpoints.down('sm')]: {
    height: '250px',
  },
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  transition: 'background-color 0.3s ease',
  padding: '20px',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 900,
  fontSize: '3.5rem',
  color: '#ff69b4',
  textAlign: 'center',
  marginBottom: '40px',
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

const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 500,
  fontSize: '1.3rem',
  color: '#ff69b4',
  marginBottom: '10px',
}));

const CardText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontSize: '1rem',
  color: '#fff',
  opacity: 0.9,
}));

const FadeInBox = styled(Box)(({ inView }) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(20px)',
  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
}));

const HomePage = () => {
  const { members } = blackpinkData;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [openSubscribeModal, setOpenSubscribeModal] = useState(false);

  const handleOpenSubscribeModal = () => setOpenSubscribeModal(true);
  const handleCloseSubscribeModal = () => setOpenSubscribeModal(false);

  return (
    <>
      <Navbar onSubscribeClick={handleOpenSubscribeModal} />
      <HeroSection onSubscribeClick={handleOpenSubscribeModal} />
      {/* Members Section */}
      <SectionContainer id="Members" ref={ref}>
        <FadeInBox inView={inView}>
          <SectionTitle variant="h2">Meet the Members</SectionTitle>
          <MembersCardGrid>
            {members && members.length > 0 ? (
              members.map((member, index) => (
                <MemberCard key={index}>
                  <MemberImage
                    className="member-image"
                    component="img"
                    image={memberImages[member.name]}
                    alt={`${member.name}`}
                  />
                  <CardContentWrapper className="card-content">
                    <CardTitle variant="h6">{member.name}</CardTitle>
                    <CardText>Role: {member.role}</CardText>
                    <CardText>Birth Date: {member.birth_date}</CardText>
                    <CardText>Nationality: {member.nationality}</CardText>
                  </CardContentWrapper>
                </MemberCard>
              ))
            ) : (
              <Typography color="error">No members data available</Typography>
            )}
          </MembersCardGrid>
        </FadeInBox>
      </SectionContainer>
      {/* Events Section */}
      <Events id="Events" />
      {/* Songs Section */}
      <Songs id="Songs" />
      {/* Subscribe Modal */}
      <Subscribe
        open={openSubscribeModal}
        onClose={handleCloseSubscribeModal}
      />
    </>
  );
};

export default HomePage;