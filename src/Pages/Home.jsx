import React from 'react'
import Navbar from '../Components/Navbar'
import Carousel from '../Components/Carousel'
import { Products, MoreProducts } from '../Components/Products'
import Cart from '../Components/Cart'
import { useState } from 'react'
import Footer from '../Components/Footer'
// import Login from '../Components/Login'
const Home= () => {
      const [isCartOpen, setIsCartOpen] = useState(false);
    //   const[showLogin, setShowLogin] = useState(false);


      const handleLoginClick = () => {
        setShowLogin((prev) => !prev); 
      };
  return (
    <>
    <Navbar setIsCartOpen={setIsCartOpen} handleLoginClick={handleLoginClick}/>
    <Carousel/>
    <Products/>
    <MoreProducts/>
    <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
    {/* <Login showLogin= {showLogin} setShowLogin={setShowLogin}/> */}
    <Footer/>

   
    </>
  )
}
export default Home;
