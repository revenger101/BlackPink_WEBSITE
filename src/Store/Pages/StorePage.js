import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, styled, TextField, MenuItem, Select, InputAdornment, FormControl, InputLabel, Button } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import ProductCard from '../Components/ProductCard';
import { useBasket } from '../context/BasketContext';

// Sample products with categories
const products = [
  { id: 1, name: 'BLACKPINK Album', price: 29.99, image: 'https://shop.blackpinkmusic.com/cdn/shop/files/BP_BOX01_GROUP.png?v=1689361769&width=300', category: 'Music', stock: 5, description: 'The latest BLACKPINK album featuring their hit songs. A must-have for every BLINK!' },
  { id: 2, name: 'Lightstick', price: 49.99, image: 'https://shop.blackpinkmusic.com/cdn/shop/products/BPLP.png?v=1595876400&width=300', category: 'Accessories', stock: 2, description: 'Official BLACKPINK lightstick to light up your concert experience!' },
  { id: 3, name: 'T-Shirt', price: 19.99, image: 'https://shop.blackpinkmusic.com/cdn/shop/products/black1.png?v=1660178860&width=300', category: 'Apparel', stock: 0, description: 'Comfortable BLACKPINK T-shirt with a stylish logo print.' },
  { id: 4, name: 'Poster Set', price: 14.99, image: 'https://shop.blackpinkmusic.com/cdn/shop/products/GRAYBOX2.png?v=1662142066&width=300', category: 'Accessories', stock: 8, description: 'A set of high-quality BLACKPINK posters for your room decor.' },
  { id: 5, name: 'Hoodie', price: 39.99, image: 'https://shop.blackpinkmusic.com/cdn/shop/products/LP.png?v=1680819150&width=300', category: 'Apparel', stock: 3, description: 'Cozy BLACKPINK hoodie to keep you warm in style.' },
  { id: 6, name: 'Cap', price: 15.99, image: 'https://shop.blackpinkmusic.com/cdn/shop/products/BPCD_9789b3e2-55c6-44a9-8cc1-6110baddcdd0.png?v=1595876458&width=300', category: 'Apparel', stock: 10, description: 'Trendy BLACKPINK cap to complete your fan look.' },
  { id: 7, name: 'Stickers', price: 9.99, image: 'https://shop.blackpinkmusic.com/cdn/shop/files/BP_BOX02_GROUP.png?v=1689361743&width=300', category: 'Accessories', stock: 1, description: 'Cute BLACKPINK stickers to decorate your belongings.' },
  { id: 8, name: 'Keychain', price: 5.99, image: 'https://shop.blackpinkmusic.com/cdn/shop/files/BP_BOX03_GROUP.png?v=1689361721&width=300', category: 'Accessories', stock: 0, description: 'Adorable BLACKPINK keychain for your keys or bag.' },
  { id: 9, name: 'Photo Book', price: 24.99, image: 'https://shop.blackpinkmusic.com/cdn/shop/files/BP_BOX01_GROUP.png?v=1689361769&width=300', category: 'Music', stock: 7, description: 'Exclusive BLACKPINK photo book with stunning visuals.' },
];

// Categories for filtering
const categories = ['All', 'Apparel', 'Accessories', 'Music'];

// Sorting options
const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A to Z', value: 'name-asc' },
  { label: 'Name: Z to A', value: 'name-desc' },
];

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff5b8e 0%, #fff 100%)',
  padding: '60px 40px',
  textAlign: 'center',
  borderRadius: '15px',
  marginBottom: '40px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url("https://shop.blackpinkmusic.com/cdn/shop/files/BP_BOX01_GROUP.png?v=1689361769&width=300") no-repeat center',
    backgroundSize: 'cover',
    opacity: 0.1,
    zIndex: 0,
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '40px',
  background: '#fff',
  color: '#1a1a1a',
  minHeight: '100vh',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: '2.5rem',
  color: '#ff5b8e',
  textAlign: 'center',
  marginBottom: '40px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px',
  flexWrap: 'wrap',
  gap: '20px',
  background: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  position: 'sticky',
  top: '80px', // Adjust based on your navbar height
  zIndex: 1000,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '300px',
  '& .MuiOutlinedInput-root': {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#1a1a1a',
    background: '#fff',
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
    fontSize: '14px',
    color: '#666',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ff5b8e',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '150px',
  '& .MuiOutlinedInput-root': {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '14px',
    color: '#1a1a1a',
    background: '#fff',
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
    fontSize: '14px',
    color: '#666',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ff5b8e',
  },
}));

const ResetButton = styled(Button)(({ theme }) => ({
  background: '#ff5b8e',
  color: '#fff',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: '14px',
  textTransform: 'uppercase',
  padding: '8px 16px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#e04e7d',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 15px rgba(255, 91, 142, 0.5)',
  },
}));

const ProductGridItem = styled(Grid)(({ theme }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(255, 91, 142, 0.2)',
  },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '40px',
  gap: '10px',
}));

const PageButton = styled(Button)(({ theme, active }) => ({
  background: active ? '#ff5b8e' : '#f9f9f9',
  color: active ? '#fff' : '#1a1a1a',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '14px',
  padding: '8px 16px',
  borderRadius: '8px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: active ? '#e04e7d' : '#ff5b8e',
    color: '#fff',
    transform: 'scale(1.05)',
  },
}));

const LoadingSpinner = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  '&:after': {
    content: '""',
    width: '40px',
    height: '40px',
    border: '4px solid #ff5b8e',
    borderTop: '4px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

const StorePage = () => {
  const { addToBasket } = useBasket();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 6; // Number of products per page

  // Simulate loading state when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate a 500ms delay
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortOption, currentPage]);

  // Filter and sort products
  let filteredProducts = products;

  // Filter by search query
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter by category
  if (selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
  }

  // Sort products
  filteredProducts = [...filteredProducts];
  if (sortOption === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name-asc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortOption('default');
    setCurrentPage(1);
  };

  return (
    <SectionContainer>
      {/* Hero Section */}
      <HeroSection>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: '3rem',
            color: '#fff',
            zIndex: 1,
            position: 'relative',
          }}
        >
          BLACKPINK Store
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '1.2rem',
            color: '#fff',
            mt: 1,
            zIndex: 1,
            position: 'relative',
          }}
        >
          Explore exclusive BLACKPINK merchandise!
        </Typography>
      </HeroSection>

      <SectionTitle variant="h2">Store</SectionTitle>

      {/* Filter, Search, and Sort Controls */}
      <FilterContainer>
        <StyledTextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch style={{ color: '#666' }} />
              </InputAdornment>
            ),
          }}
        />

        <StyledFormControl variant="outlined">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        <StyledFormControl variant="outlined">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort By"
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        <ResetButton onClick={handleResetFilters}>Reset Filters</ResetButton>
      </FilterContainer>

      {/* Product Count Indicator */}
      <Typography
        sx={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '16px',
          color: '#666',
          textAlign: 'center',
          mb: 4,
        }}
      >
        Showing {paginatedProducts.length} of {filteredProducts.length} products
      </Typography>

      {/* Product Grid */}
      {isLoading ? (
        <LoadingSpinner />
      ) : paginatedProducts.length === 0 ? (
        <Typography
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '18px',
            color: '#666',
            textAlign: 'center',
            mt: 4,
          }}
        >
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {paginatedProducts.map((product) => (
            <ProductGridItem item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} onAddToBasket={addToBasket} />
              <Typography
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '12px',
                  color: '#ff5b8e',
                  textAlign: 'center',
                  mt: 1,
                  background: 'rgba(255, 91, 142, 0.1)',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  display: 'inline-block',
                }}
              >
                {product.category}
              </Typography>
            </ProductGridItem>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <PageButton
              key={page}
              active={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
        </PaginationContainer>
      )}
    </SectionContainer>
  );
};

export default StorePage;