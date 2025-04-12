import React, { useState } from 'react';
import { Products } from '../Components/Products';
import Navbar from '../Components/Navbar';
import Cart from '../Components/Cart';
import Footer from '../Components/Footer';

const ProductPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLoginClick = () => {
    // Optional: Add login logic here
  };

  return (
    <>
      <Navbar setIsCartOpen={setIsCartOpen} handleLoginClick={handleLoginClick} />
      <Products />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <Footer />
    </>
  );
};

export default ProductPage;
