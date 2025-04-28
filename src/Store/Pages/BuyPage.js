import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutForm from '../Components/CheckoutForm';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '60px 30px',
  background: 'transparent',
  color: '#333',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  fontSize: '2.5rem',
  color: '#ff85b4',
  textAlign: 'center',
  marginBottom: '40px',
  textShadow: '0 0 10px rgba(255, 182, 193, 0.5)',
  letterSpacing: '1px',
  textTransform: 'uppercase',
}));

const BuyPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { basket, totalPrice } = state || { basket: [], totalPrice: 0 };

  const handleOrderSubmit = () => {
    navigate('/store'); // Redirect back to Store page after placing order
  };

  return (
    <SectionContainer>
      <SectionTitle variant="h2">Checkout</SectionTitle>
      {basket.length === 0 ? (
        <Typography sx={{ textAlign: 'center', fontFamily: "'Poppins', sans-serif", color: '#666' }}>
          Your basket is empty. Please add items to proceed.
        </Typography>
      ) : (
        <CheckoutForm totalPrice={totalPrice} onSubmit={handleOrderSubmit} />
      )}
    </SectionContainer>
  );
};

export default BuyPage;