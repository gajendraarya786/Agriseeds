import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Contact from './Pages/Contact';
import Home from './Pages/Home';
import ProductPage from './Pages/ProductPage';
import { Routes, Route } from 'react-router-dom';
import CheckoutPage from './Pages/CheckoutPage';
import SuccessPage from './Pages/SuccessPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/success' element={<SuccessPage/>}/>
      </Routes>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
