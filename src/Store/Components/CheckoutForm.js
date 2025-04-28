import React, { useState } from 'react';
import { Box, TextField, Button, Typography, styled } from '@mui/material';
import { toast } from 'react-toastify';

const FormContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '15px',
  padding: '40px',
  boxShadow: '0 4px 20px rgba(255, 182, 193, 0.2)',
  maxWidth: '600px',
  margin: '0 auto',
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  '& .MuiInputBase-root': {
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '8px',
    color: '#333',
    fontFamily: "'Poppins', sans-serif",
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 182, 193, 0.5)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ff85b4',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ff85b4',
    boxShadow: '0 0 10px rgba(255, 182, 193, 0.5)',
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 182, 193, 0.7)',
    fontFamily: "'Poppins', sans-serif",
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ff85b4',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff85b4 30%, #fff 90%)',
  color: '#1a1a1a',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'uppercase',
  padding: '12px 0',
  width: '100%',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(255, 182, 193, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 0 15px rgba(255, 182, 193, 0.6)',
    background: 'linear-gradient(45deg, #fff 30%, #ff85b4 90%)',
  },
}));

const PaymentMethodContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
}));

const PaymentMethodOption = styled(Box)(({ theme, selected }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  background: selected ? 'rgba(255, 182, 193, 0.1)' : 'rgba(255, 255, 255, 0.5)',
  border: selected ? '2px solid #ff85b4' : '2px solid rgba(255, 182, 193, 0.5)',
  borderRadius: '8px',
  marginBottom: '10px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 182, 193, 0.15)',
    borderColor: '#ff85b4',
  },
}));

const PaymentIcon = styled(Typography)(({ theme }) => ({
  fontSize: '24px', // Size of the emoji icon
  marginRight: '10px',
  color: '#ff85b4', // Match the theme color
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '30px',
  height: '30px',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  fontSize: '18px',
  color: '#ff85b4',
  marginBottom: '15px',
}));

const CheckoutForm = ({ totalPrice, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    orderNote: '',
    cardNumber: '',
    paymentMethod: 'credit-card', // Default payment method
  });

  const paymentMethods = [
    {
      value: 'credit-card',
      label: 'Credit Card',
      icon: '💳', // Emoji for credit card
    },
    {
      value: 'paypal',
      label: 'PayPal',
      icon: '🌐', // Emoji for PayPal (web/globe as a placeholder)
    },
    {
      value: 'cash-on-delivery',
      label: 'Cash on Delivery',
      icon: '💵', // Emoji for cash
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    toast.success('Order placed successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <FormContainer>
      <Typography
        variant="h5"
        sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#ff85b4', mb: 4, textAlign: 'center' }}
      >
        Checkout
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Shipping Information */}
        <SectionTitle>Shipping Information</SectionTitle>
        <FormField
          label="Full Name"
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
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <FormField
          label="Shipping Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          required
        />
        <FormField
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <FormField
          label="Order Note (Optional)"
          name="orderNote"
          value={formData.orderNote}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={2}
        />

        {/* Payment Method */}
        <SectionTitle>Payment Method</SectionTitle>
        <PaymentMethodContainer>
          {paymentMethods.map((method) => (
            <PaymentMethodOption
              key={method.value}
              selected={formData.paymentMethod === method.value}
              onClick={() => handlePaymentMethodChange(method.value)}
            >
              <PaymentIcon>{method.icon}</PaymentIcon>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#333' }}>
                {method.label}
              </Typography>
            </PaymentMethodOption>
          ))}
        </PaymentMethodContainer>

        {/* Card Number (only shown for Credit Card method) */}
        {formData.paymentMethod === 'credit-card' && (
          <FormField
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        )}

        {/* Order Summary */}
        <SectionTitle>Order Summary</SectionTitle>
        <Typography
          variant="body1"
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#333', mb: 2 }}
        >
          Total: ${totalPrice.toFixed(2)}
        </Typography>

        <SubmitButton type="submit">Place Order</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CheckoutForm;