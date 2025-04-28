import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, IconButton, styled } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const ModalOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.3) 0%, transparent 70%), rgba(10, 10, 10, 0.95)', // Softer pink and darker background
  backdropFilter: 'blur(8px)', // Increased blur for a modern look
  zIndex: 10000,
  animation: 'fadeIn 0.5s ease-out',
  '& .background-particles': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  '& .background-particle': {
    position: 'absolute',
    width: '3px',
    height: '3px',
    background: '#ffb6c1', // Light pink particles
    borderRadius: '50%',
    boxShadow: '0 0 5px rgba(255, 182, 193, 0.5)',
    animation: 'floatParticle 5s infinite linear',
  },
  '@keyframes floatParticle': {
    '0%': { transform: 'translate(0, 0)', opacity: 0.5 },
    '100%': { transform: 'translate(30px, -30px)', opacity: 0 },
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(50, 50, 50, 0.95) 100%)', // Softer gradient
  borderRadius: '15px',
  padding: '40px',
  maxWidth: '450px',
  width: '90%',
  position: 'relative',
  boxShadow: '0 0 30px rgba(255, 182, 193, 0.4)', // Softer pink glow
  animation: 'modalSlideIn 0.5s ease-out',
  '@keyframes modalSlideIn': {
    '0%': { transform: 'translateY(-20px)', opacity: 0 },
    '100%': { transform: 'translateY(0)', opacity: 1 },
  },
  [theme.breakpoints.down('sm')]: {
    padding: '30px',
    maxWidth: '90%',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#ffb6c1', // Light pink
  transition: 'transform 0.3s ease, color 0.3s ease',
  '&:hover': {
    color: '#fff',
    transform: 'rotate(90deg)',
  },
}));

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 800,
  fontSize: '2rem',
  color: '#ffb6c1', // Softer pink
  textAlign: 'center',
  marginBottom: '25px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  animation: 'titleFade 1s ease-in-out',
  '@keyframes titleFade': {
    '0%': { opacity: 0, transform: 'scale(0.95)' },
    '100%': { opacity: 1, transform: 'scale(1)' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  '& .MuiInputBase-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    color: '#fff',
    fontFamily: "'Roboto', sans-serif",
    transition: 'background-color 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 182, 193, 0.5)', // Softer pink border
    transition: 'border-color 0.3s ease',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffb6c1',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffb6c1',
    boxShadow: '0 0 10px rgba(255, 182, 193, 0.5)',
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 182, 193, 0.7)',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ffb6c1',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ffb6c1 30%, #fff 90%)', // Softer gradient
  color: '#1a1a1a',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  padding: '12px 0',
  width: '100%',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(255, 182, 193, 0.3)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 0 15px rgba(255, 182, 193, 0.6)',
    background: 'linear-gradient(45deg, #fff 30%, #ffb6c1 90%)',
  },
  '& .success-overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 182, 193, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'uppercase',
    opacity: 0,
    animation: 'successFade 1s ease-in-out forwards',
  },
  '@keyframes successFade': {
    '0%': { opacity: 0, transform: 'scale(0.8)' },
    '50%': { opacity: 1, transform: 'scale(1)' },
    '100%': { opacity: 0, transform: 'scale(1.2)' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: '10px 0',
  },
}));

const Subscribe = ({ open, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', email: '' });
    }, 1500); // Close modal after 1.5 seconds
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverlay>
        {/* Background Particles */}
        <Box className="background-particles">
          {Array.from({ length: 10 }).map((_, i) => (
            <Box
              key={i}
              className="background-particle"
              sx={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </Box>
        <ModalContent>
          <CloseButton onClick={onClose}>
            <FaTimes size={20} />
          </CloseButton>
          <ModalTitle variant="h3">Join the BLACKPINK Fam</ModalTitle>
          <form onSubmit={handleSubmit}>
            <FormField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <SubmitButton type="submit">
              Subscribe
              {submitted && (
                <Box className="success-overlay">
                  Subscribed!
                </Box>
              )}
            </SubmitButton>
          </form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default Subscribe;