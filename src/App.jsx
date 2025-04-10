
import './App.css';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import ProductPage from './Pages/ProductPage';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
