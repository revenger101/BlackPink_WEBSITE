import React, { useState } from 'react';
import { Box, Typography, TextField, Button, styled, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignInContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.15) 0%, transparent 70%)',
    zIndex: 0,
  },
}));

const FormBox = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: '12px',
  padding: '40px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  zIndex: 1,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '15px',
    color: '#1a1a1a',
    background: '#f9f9f9',
    borderRadius: '8px',
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: '#ff5b8e',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff5b8e',
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '15px',
    color: '#666',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ff5b8e',
  },
}));

const SignInButton = styled(Button)(({ theme }) => ({
  background: '#ff5b8e',
  color: '#fff',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '15px',
  textTransform: 'uppercase',
  padding: '12px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(255, 91, 142, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#e04e7d',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(255, 91, 142, 0.5)',
  },
}));

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      // Simulate successful sign-in (replace with actual authentication logic)
      navigate('/store');
    }
  };

  return (
    <SignInContainer>
      <FormBox component="form" onSubmit={handleSignIn}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            color: '#ff5b8e',
            textAlign: 'center',
            mb: 3,
          }}
        >
          Sign In
        </Typography>

        <StyledTextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />

        <SignInButton type="submit" fullWidth>
          Sign In
        </SignInButton>

        <Typography
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '14px',
            color: '#666',
            textAlign: 'center',
            mt: 2,
          }}
        >
          Don’t have an account?{' '}
          <MuiLink
            component={Link}
            to="/signup"
            sx={{
              color: '#ff5b8e',
              textDecoration: 'none',
              fontWeight: 600,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Sign Up
          </MuiLink>
        </Typography>
      </FormBox>
    </SignInContainer>
  );
};

export default SignInPage;