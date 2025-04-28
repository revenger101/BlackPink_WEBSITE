import React, { createContext, useState, useContext } from 'react';

// Create the Basket Context
const BasketContext = createContext();

// Create a Provider component to wrap the app and provide the basket state
export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  // Function to add a product to the basket
  const addToBasket = (product) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find((item) => item.id === product.id);
      if (existingItem) {
        return prevBasket.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevBasket, { ...product, quantity: 1 }];
    });
  };

  // Function to remove a product from the basket
  const removeFromBasket = (productId) => {
    setBasket((prevBasket) => prevBasket.filter((item) => item.id !== productId));
  };

  // Calculate the total price of items in the basket
  const totalPrice = basket.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate the total number of items in the basket
  const totalItems = basket.reduce((total, item) => total + item.quantity, 0);

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, totalPrice, totalItems }}>
      {children}
    </BasketContext.Provider>
  );
};

// Custom hook to use the Basket Context
export const useBasket = () => useContext(BasketContext);