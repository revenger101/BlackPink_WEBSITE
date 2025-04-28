import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, styled, IconButton } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { FaPlay, FaClock, FaMusic, FaHeadphones } from 'react-icons/fa'; // Icons for play button, duration, genre, streams
import blackpinkData from '../Assets/Data/blackpink_data.json';

const songImages = {
  'Whistle': 'https://i.pinimg.com/736x/16/19/94/161994f5effb748c60ed62035a5e54ef.jpg',
  'Boombayah': 'https://i.pinimg.com/736x/c8/57/d7/c857d78fa07d0e243cad05cccda94df3.jpg',
  'Ddu-Du Ddu-Du': 'https://i.pinimg.com/736x/4e/ef/0a/4eef0aeab5f062dec22b871a06ced2de.jpg',
  'How You Like That': 'https://i.pinimg.com/736x/53/f0/d9/53f0d95316112026f678cdbd99486c8c.jpg',
  'Ice Cream (with Selena Gomez)': 'https://i.pinimg.com/736x/0e/ca/8c/0eca8ce4732bda3120b0eb85bf6f0dc1.jpg',
  'Pink Venom': 'https://i.pinimg.com/736x/19/12/4f/19124f82d010cc71303fd3e409ed5926.jpg',
  'Shut Down': 'https://i.pinimg.com/736x/f3/92/cb/f392cbe924e3cf9b3e857f80408f35ef.jpg',
  'The Girls': 'https://i.pinimg.com/736x/f7/47/c8/f747c8ad4d3514d3b194b766f91ab999.jpg',
  'Kill This Love': 'https://i.pinimg.com/736x/02/72/69/027269c11e97eb8f5e93c0200a19efb3.jpg',
};

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '60px 20px',
  background: 'linear-gradient(180deg, #0a0a0a 0%, #1c1c1c 100%)',
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
  '& .stars': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  '& .star': {
    position: 'absolute',
    width: '2px',
    height: '2px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
    animation: 'twinkle 3s infinite ease-in-out',
    '&:nth-child(odd)': {
      background: 'rgba(255, 105, 180, 0.8)',
      boxShadow: '0 0 5px rgba(255, 105, 180, 0.5)',
    },
  },
  '@keyframes twinkle': {
    '0%': { opacity: 0.3, transform: 'scale(1)' },
    '50%': { opacity: 0.8, transform: 'scale(1.5)' },
    '100%': { opacity: 0.3, transform: 'scale(1)' },
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

const SongsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '30px',
  maxWidth: '1200px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 2,
  padding: '0 20px',
}));

const SongCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  color: '#fff',
  borderRadius: '15px',
  overflow: 'hidden',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
  border: '2px solid transparent',
  '&:hover': {
    transform: 'scale(1) rotate(1deg)', // Added slight rotation for a dynamic effect
    boxShadow: '0 12px 30px rgba(255, 105, 180, 0.6)', // Enhanced glow
    border: '2px solid transparent',
    backgroundImage: 'linear-gradient(#0a0a0a, #0a0a0a), linear-gradient(45deg, #ff69b4, #fff)', // Gradient border
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '10px',
  },
}));

const SongImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '200px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    height: '150px',
  },
}));

const SongImage = styled(CardMedia)(({ theme }) => ({
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease, filter 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    filter: 'brightness(0.8)', // Slight darkening on hover
  },
}));

const PlayButtonOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 1,
  },
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  color: '#ff69b4',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: '15px',
  borderRadius: '50%',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 105, 180, 0.4)',
    transform: 'scale(1.2)',
  },
}));

const SongContent = styled(CardContent)(({ theme }) => ({
  padding: '25px',
  background: 'rgba(0, 0, 0, 0.3)', // Slightly darker background for contrast
  textAlign: 'left', // Changed to left for better readability
  [theme.breakpoints.down('sm')]: {
    padding: '15px',
  },
}));

const SongTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: '1.8rem', // Larger title for emphasis
  color: '#ff69b4',
  marginBottom: '15px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const SongText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontSize: '0.95rem',
  color: '#fff',
  opacity: 0.9,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const LyricsSnippet = styled(Typography)(({ theme }) => ({
  fontFamily: "'Roboto', sans-serif",
  fontSize: '0.9rem',
  color: '#ff69b4',
  fontStyle: 'italic',
  marginTop: '15px',
  opacity: 0.8,
  borderLeft: '3px solid #ff69b4',
  paddingLeft: '10px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
  },
}));

const FadeInBox = styled(Box)(({ inView }) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(10px)',
  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
}));

const Songs = ({ id }) => {
  const { songs } = blackpinkData;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Simulated additional data (since not in blackpink_data.json)
  const enhancedSongs = songs.map((song, index) => ({
    ...song,
    duration: ['3:45', '4:02', '3:30', '3:58', '2:55', '3:22', '3:41', '2:48', '3:13'][index], // Simulated durations
    genre: ['K-Pop', 'Hip-Hop', 'Pop', 'Dance-Pop', 'Pop', 'K-Pop', 'Trap', 'Pop', 'K-Pop'][index], // Simulated genres
    streams: ['1.2B', '1.5B', '1.8B', '2.0B', '1.1B', '1.4B', '1.3B', '900M', '1.6B'][index], // Simulated stream counts
    lyricsSnippet: [
      '"Yeah, we some killers..."',
      '"Boom, boom, bayah..."',
      '"Hit you with that ddu-du..."',
      '"How you like that?..."',
      '"Come and get it like..."',
      '"Pink venom, venom..."',
      '"Shut it down, down..."',
      '"We the girls, yeah..."',
      '"Kill this love, oh..."',
    ][index], // Simulated lyrics snippets
  }));

  // Generate stars with random positions and animation delays
  const stars = Array.from({ length: 20 }).map((_, index) => (
    <Box
      key={index}
      className="star"
      sx={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    />
  ));

  return (
    <SectionContainer id={id} ref={ref}>
      <FadeInBox inView={inView}>
        <Box className="stars">{stars}</Box>
        <SectionTitle variant="h2">Top Hits</SectionTitle>
        <SongsGrid>
          {enhancedSongs.map((song, index) => (
            <SongCard key={index}>
              <SongImageWrapper>
                <SongImage
                  component="img"
                  image={songImages[song.title]}
                  alt={song.title}
                />
                <PlayButtonOverlay>
                  <PlayButton>
                    <FaPlay size={24} />
                  </PlayButton>
                </PlayButtonOverlay>
              </SongImageWrapper>
              <SongContent>
                <SongTitle variant="h6">{song.title}</SongTitle>
                <SongText>
                  <FaMusic size={14} /> Album: {song.album}
                </SongText>
                <SongText>
                  <FaClock size={14} /> Duration: {song.duration}
                </SongText>
                <SongText>
                  <FaMusic size={14} /> Genre: {song.genre}
                </SongText>
                <SongText>
                  <FaHeadphones size={14} /> Streams: {song.streams}
                </SongText>
                <SongText>Release Date: {song.release_date}</SongText>
                <LyricsSnippet>
                  {song.lyricsSnippet}
                </LyricsSnippet>
              </SongContent>
            </SongCard>
          ))}
        </SongsGrid>
      </FadeInBox>
    </SectionContainer>
  );
};

export default Songs;