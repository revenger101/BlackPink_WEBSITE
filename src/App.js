import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import StoreNavbar from './Store/Components/StoreNavbar';
import StoreFooter from './Store/Components/StoreFooter';
import BlackpinkSpinner from './Components/BlackpinkSpinner';
import { Box, styled } from '@mui/material';
import HomePage from './Pages/HomePage';
import StorePage from './Store/Pages/StorePage';
import BuyPage from './Store/Pages/BuyPage';
import SignInPage from './Store/Pages/SignInPage'; // Import SignInPage
import SignUpPage from './Store/Pages/SignUpPage'; // Import SignUpPage
import { BasketProvider } from './Store/context/BasketContext';

// Apply BLACKPINK-themed background to the entire app
const AppContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
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
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

const AppContent = () => {
  const location = useLocation();
  const isStoreRoute = location.pathname.startsWith('/store') || location.pathname.startsWith('/buy');
  const isAuthRoute = location.pathname === '/signin' || location.pathname === '/signup'; // Check for auth routes

  return (
    <>
      {!isAuthRoute && (isStoreRoute ? <StoreNavbar /> : <Navbar />)}
      <Box sx={{ flex: '1 0 auto', paddingTop: isAuthRoute ? 0 : '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Box>
      {!isAuthRoute && (isStoreRoute ? <StoreFooter /> : <Footer />)}
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <Router>
      <BasketProvider>
        <AppContainer>
          {isLoading && <BlackpinkSpinner />}
          <AppContent />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{ zIndex: 1200, top: '80px' }}
          />
        </AppContainer>
      </BasketProvider>
    </Router>
  );
}

export default App;