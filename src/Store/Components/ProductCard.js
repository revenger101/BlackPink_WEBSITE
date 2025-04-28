import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, styled, Box, Modal, Fade, Tabs, Tab, IconButton, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '15px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(255, 182, 193, 0.2)',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(255, 182, 193, 0.4)',
  },
}));

const ProductImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  height: 200,
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.3)',
  opacity: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 1,
  },
}));

const QuickViewButton = styled(Button)(({ theme }) => ({
  background: '#fff',
  color: '#ff85b4',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  fontSize: '12px',
  textTransform: 'uppercase',
  padding: '6px 16px',
  borderRadius: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#ff85b4',
    color: '#fff',
    transform: 'scale(1.05)',
  },
}));

const Badge = styled(Typography)(({ theme, type }) => ({
  position: 'absolute',
  top: '10px',
  left: '10px',
  background: type === 'sale' ? '#ff5b8e' : type === 'new' ? '#4caf50' : '#ff9800',
  color: '#fff',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  fontSize: '12px',
  padding: '4px 10px',
  borderRadius: '12px',
  textTransform: 'uppercase',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
}));

const AddButton = styled(Button)(({ theme, disabled }) => ({
  background: disabled ? '#ccc' : 'linear-gradient(45deg, #ff85b4 30%, #fff 90%)',
  color: disabled ? '#666' : '#1a1a1a',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  fontSize: '14px',
  textTransform: 'uppercase',
  padding: '8px 20px',
  borderRadius: '20px',
  boxShadow: '0 0 10px rgba(255, 182, 193, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: disabled ? 'none' : 'scale(1.05)',
    boxShadow: disabled ? 'none' : '0 0 15px rgba(255, 182, 193, 0.6)',
    background: disabled ? '#ccc' : 'linear-gradient(45deg, #fff 30%, #ff85b4 90%)',
  },
}));

const StockStatus = styled(Typography)(({ theme, status }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontSize: '12px',
  color: status === 'in-stock' ? '#4caf50' : status === 'low-stock' ? '#ff9800' : '#f44336',
  marginTop: '8px',
  fontWeight: 500,
}));

const RatingStars = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#ffca28',
  marginTop: '8px',
}));

const CloseButton = styled(Button)(({ theme }) => ({
  background: '#f44336',
  color: '#fff',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  fontSize: '14px',
  textTransform: 'uppercase',
  padding: '8px 20px',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#d32f2f',
    transform: 'scale(1.05)',
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '800px',
  background: 'rgba(255, 255, 255, 0.98)',
  borderRadius: '20px',
  boxShadow: '0 8px 30px rgba(255, 182, 193, 0.3)',
  padding: '40px',
  display: 'flex',
  gap: '30px',
  outline: 'none',
  animation: 'fadeIn 0.3s ease',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translate(-50%, -40%)' },
    '100%': { opacity: 1, transform: 'translate(-50%, -50%)' },
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    padding: '20px',
    maxWidth: '95%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
}));

const ModalImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '300px',
  height: '300px',
  overflow: 'hidden',
  borderRadius: '15px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover img': {
    transform: 'scale(1.1)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 'auto',
    maxHeight: '250px',
  },
}));

const ModalImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '15px',
  transition: 'transform 0.3s ease',
}));

const ModalDetails = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  [theme.breakpoints.down('sm')]: {
    gap: '15px',
  },
}));

const GradientDivider = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '4px',
  background: 'linear-gradient(90deg, #ff85b4, #fff)',
  borderRadius: '2px',
  margin: '10px 0',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#ff85b4',
    height: '3px',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  fontSize: '14px',
  textTransform: 'uppercase',
  color: '#666',
  '&.Mui-selected': {
    color: '#ff85b4',
  },
}));

const ColorSwatch = styled(Box)(({ theme, color }) => ({
  width: '30px',
  height: '30px',
  backgroundColor: color,
  borderRadius: '50%',
  border: '2px solid #ddd',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    borderColor: '#ff85b4',
    boxShadow: '0 0 10px rgba(255, 182, 193, 0.5)',
  },
}));

const QuantitySelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px',
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  background: '#f9f9f9',
  color: '#ff85b4',
  borderRadius: '50%',
  border: '1px solid #ddd',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#ff85b4',
    color: '#fff',
    borderColor: '#ff85b4',
  },
}));

const QuantityField = styled(TextField)(({ theme }) => ({
  width: '60px',
  '& .MuiInputBase-root': {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '14px',
    textAlign: 'center',
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 182, 193, 0.5)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ff85b4',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ff85b4',
  },
}));

const ProductCard = ({ product, onAddToBasket }) => {
  const [openModal, setOpenModal] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const enhancedProduct = {
    ...product,
    stock: product.stock ?? Math.floor(Math.random() * 10),
    isNew: product.id % 3 === 0,
    onSale: product.price < 20,
    rating: (Math.random() * 2 + 3).toFixed(1),
    description: product.description ?? `This is a high-quality ${product.name} from BLACKPINK's official merchandise collection. Perfect for fans and collectors alike!`,
    category: product.category ?? 'Uncategorized',
    sku: `BP-${product.id}-${Math.floor(Math.random() * 1000)}`,
    dimensions: product.dimensions ?? '10 x 15 x 2 cm',
    material: product.material ?? 'Mixed Materials',
    weight: product.weight ?? '0.3 kg',
    colors: product.colors ?? ['#ff5b8e', '#000000', '#ffffff'],
  };

  const { stock, isNew, onSale, rating, description, category, sku, dimensions, material, weight, colors } = enhancedProduct;

  const stockStatus = stock === 0 ? 'out-of-stock' : stock <= 3 ? 'low-stock' : 'in-stock';
  const stockText = stock === 0 ? 'Out of Stock' : stock <= 3 ? `Low Stock (${stock} left)` : 'In Stock';

  const handleAddToBasket = () => {
    if (stock === 0) return;
    const productToAdd = { ...enhancedProduct, quantity };
    onAddToBasket(productToAdd);
    toast.success(`${quantity} x ${enhancedProduct.name} added to basket!`, {
      position: 'top-right',
      autoClose: 3000,
    });
    setOpenModal(false);
  };

  const handleQuickView = () => {
    setOpenModal(true);
    setQuantity(1);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(stock, value));
    setQuantity(newQuantity);
  };

  return (
    <>
      <StyledCard>
        <ProductImageWrapper>
          <ProductImage component="img" image={enhancedProduct.image} alt={enhancedProduct.name} />
          <ImageOverlay>
            <QuickViewButton onClick={handleQuickView}>Quick View</QuickViewButton>
          </ImageOverlay>
          {onSale && <Badge type="sale">On Sale</Badge>}
          {isNew && !onSale && <Badge type="new">New</Badge>}
          {stockStatus === 'low-stock' && !onSale && !isNew && <Badge type="low-stock">Low Stock</Badge>}
        </ProductImageWrapper>

        <CardContent sx={{ padding: '20px' }}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: '#333', mb: 1 }}
          >
            {enhancedProduct.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: onSale ? '#f44336' : '#666', mb: 1 }}
          >
            ${enhancedProduct.price.toFixed(2)}
            {onSale && (
              <Typography
                component="span"
                sx={{ fontSize: '12px', color: '#999', textDecoration: 'line-through', ml: 1 }}
              >
                DT{(enhancedProduct.price * 1.3).toFixed(2)}
              </Typography>
            )}
          </Typography>
          <RatingStars>
            {'★'.repeat(Math.floor(rating))} {rating}/5
          </RatingStars>
          <StockStatus status={stockStatus}>{stockText}</StockStatus>
          <Box sx={{ display: 'flex', gap: '10px', mt: 2 }}>
            <AddButton onClick={handleAddToBasket} disabled={stock === 0}>
              {stock === 0 ? 'Sold Out' : 'Add to Basket'}
            </AddButton>
          </Box>
        </CardContent>
      </StyledCard>

      {/* Quick View Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <ModalContent>
            <ModalImageWrapper>
              <ModalImage src={enhancedProduct.image} alt={enhancedProduct.name} />
            </ModalImageWrapper>
            <ModalDetails>
              <Typography
                variant="h4"
                sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: '#333' }}
              >
                {enhancedProduct.name}
              </Typography>
              <GradientDivider />
              <Typography
                variant="h6"
                sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: onSale ? '#f44336' : '#666' }}
              >
                ${enhancedProduct.price.toFixed(2)}
                {onSale && (
                  <Typography
                    component="span"
                    sx={{ fontSize: '16px', color: '#999', textDecoration: 'line-through', ml: 1 }}
                  >
                    ${(enhancedProduct.price * 1.3).toFixed(2)}
                  </Typography>
                )}
              </Typography>
              <RatingStars>
                {'★'.repeat(Math.floor(rating))} {rating}/5
              </RatingStars>
              <StockStatus status={stockStatus}>{stockText}</StockStatus>

              {/* Category and SKU */}
              <Box sx={{ display: 'flex', gap: '20px', mt: 1 }}>
                <Typography
                  sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: '#666' }}
                >
                  <strong>Category:</strong> {category}
                </Typography>
                <Typography
                  sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: '#666' }}
                >
                  <strong>SKU:</strong> {sku}
                </Typography>
              </Box>

              {/* Available Colors */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 600, color: '#333', mb: 1 }}
                >
                  Available Colors:
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  {colors.map((color, index) => (
                    <ColorSwatch key={index} color={color} />
                  ))}
                </Box>
              </Box>

              {/* Quantity Selector */}
              {stock > 0 && (
                <QuantitySelector>
                  <Typography
                    sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 600, color: '#333' }}
                  >
                    Quantity:
                  </Typography>
                  <QuantityButton onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>
                    <RemoveIcon fontSize="small" />
                  </QuantityButton>
                  <QuantityField
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    type="number"
                    variant="outlined"
                    size="small"
                    inputProps={{ min: 1, max: stock, style: { textAlign: 'center' } }}
                  />
                  <QuantityButton onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= stock}>
                    <AddIcon fontSize="small" />
                  </QuantityButton>
                </QuantitySelector>
              )}

              {/* Tabs for Description and Specifications */}
              <StyledTabs value={tabValue} onChange={handleTabChange} centered>
                <StyledTab label="Description" />
                <StyledTab label="Specifications" />
              </StyledTabs>
              {tabValue === 0 && (
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "'Poppins', sans-serif", color: '#666', lineHeight: 1.8, mt: 1 }}
                >
                  {description}
                </Typography>
              )}
              {tabValue === 1 && (
                <Box sx={{ mt: 1 }}>
                  <Typography
                    sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: '#666', mb: 1 }}
                  >
                    <strong>Dimensions:</strong> {dimensions}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: '#666', mb: 1 }}
                  >
                    <strong>Material:</strong> {material}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: '#666' }}
                  >
                    <strong>Weight:</strong> {weight}
                  </Typography>
                </Box>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: '15px', mt: 3 }}>
                <AddButton onClick={handleAddToBasket} disabled={stock === 0}>
                  {stock === 0 ? 'Sold Out' : 'Add to Basket'}
                </AddButton>
                <CloseButton onClick={handleCloseModal}>Close</CloseButton>
              </Box>
            </ModalDetails>
          </ModalContent>
        </Fade>
      </Modal>
    </>
  );
};

export default ProductCard;