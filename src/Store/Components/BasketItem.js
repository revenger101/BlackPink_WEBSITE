import React from 'react';
import { Box, Typography, styled, IconButton } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { useBasket } from '../context/BasketContext'; // Adjust the path as needed
import { toast } from 'react-toastify'; // Import toast

const BasketItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: '#fff',
  borderRadius: '8px',
  padding: '12px 16px',
  marginBottom: '12px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '50px',
  height: '50px',
  objectFit: 'cover',
  borderRadius: '6px',
  marginRight: '20px',
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  color: '#ff5b8e',
  marginLeft: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#e04e7d',
    backgroundColor: 'transparent',
  },
}));

const BasketItem = ({ item }) => {
  const { removeFromBasket } = useBasket();

  const handleDelete = () => {
    removeFromBasket(item.id);
    // Show toast notification
    toast.success(`${item.name} removed from basket!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressStyle: { background: '#ff5b8e' }, // Deep pink progress bar
      style: {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '14px',
        color: '#1a1a1a',
        background: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      },
    });
  };

  return (
    <BasketItemContainer>
      <ProductImage src={item.image} alt={item.name} />
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body1"
          sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: '#1a1a1a', fontSize: '15px' }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily: "'Montserrat', sans-serif", color: '#666', fontSize: '13px', mt: 0.5 }}
        >
          ${item.price.toFixed(2)} x {item.quantity}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: '#ff5b8e', fontSize: '15px' }}
      >
        ${(item.price * item.quantity).toFixed(2)}
      </Typography>
      <DeleteButton onClick={handleDelete}>
        <FaTrash size={16} />
      </DeleteButton>
    </BasketItemContainer>
  );
};

export default BasketItem;