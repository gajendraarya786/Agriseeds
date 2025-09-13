import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance.js';
import useCartStore from '../store/cartStore';
import { 
  ShoppingCart, 
  Star, 
  Heart, 
  Eye, 
  ArrowRight, 
  Leaf, 
  Sparkles,
  TrendingUp,
  Award,

  Search,
  Loader
} from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="relative">
      <div className="animate-spin rounded-full h-12 w-12 border-3 border-green-200"></div>
      <div className="animate-spin rounded-full h-12 w-12 border-3 border-green-500 border-t-transparent absolute top-0 left-0"></div>
      <Leaf className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
    </div>
  </div>
);

export function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
      } catch (err) {
        setError('Unable to load products. Please check your connection.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      toast.info('Removed from favorites');
    } else {
      newFavorites.add(productId);
      toast.success('Added to favorites');
    }
    setFavorites(newFavorites);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-4 border">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Something went wrong</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const featuredProducts = filteredProducts.slice(0, 8);
  const remainingProducts = filteredProducts.slice(8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/30">
      {/* Hero Section */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Premium Seed Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of high-quality seeds for your garden
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for seeds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:border-green-700 text-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Our most popular and highest-rated seeds</p>
          </div>
          <div className="flex items-center space-x-3">
          </div>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse all products</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onAddToCart={handleAddToCart}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.has(product._id)}
                onViewProduct={() => navigate(`/product/${product._id}`)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* More Products Section */}
      {remainingProducts.length > 0 && (
        <MoreProducts 
          products={remainingProducts} 
          handleAddToCart={handleAddToCart} 
          navigate={navigate}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite, onViewProduct }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-50">
        <img
          alt={product.imageAlt}
          src={product.imageUrl}
          className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
          onClick={onViewProduct}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        
        {/* Action Buttons */}
        <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-70 translate-x-1'}`}>
          <button
            onClick={() => onToggleFavorite(product._id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white shadow-md'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onViewProduct}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-green-700 hover:text-white transition-all duration-200 shadow-md"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm ">
            Premium
          </span>
        </div>

        {/* Quick Add Button */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-white/95 backdrop-blur-sm text-gray-800 font-medium py-2.5 px-4 rounded-lg hover:bg-white transition-all duration-200 flex items-center justify-center shadow-lg border border-white/20"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Quick Add
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2 font-medium">(4.9)</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors duration-200 cursor-pointer" onClick={onViewProduct}>
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{product.color}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-bold text-gray-900">Rs{product.price}</p>
            <p className="text-sm text-gray-400 line-through">₹{(parseInt(product.price.replace('₹', '')) * 1.25).toFixed(0)}</p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors duration-200 shadow-sm flex items-center"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export function MoreProducts({ products, handleAddToCart, navigate, favorites, onToggleFavorite }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">More Great Products</h2>
            <p className="text-gray-600">Explore our complete collection of premium seeds</p>
          </div>
          <button 
            onClick={() => navigate('/products')}
            className="group bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm flex items-center"
          >
            View All Products
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden bg-gray-50">
                <img
                  alt={product.imageAlt}
                  src={product.imageUrl}
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                  onClick={() => navigate(`/product/${product._id}`)}
                />
                
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => onToggleFavorite(product._id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                      favorites.has(product._id)
                        ? 'bg-red-500 text-white shadow-md' 
                        : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white shadow-sm'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(product._id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="bg-green-600 text-white px-2.5 py-1 rounded-full text-xs font-medium shadow-sm">
                    Popular
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1.5 font-medium">(4.8)</span>
                </div>
                
                <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-700 transition-colors duration-200 cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{product.color}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">Rs{product.price}</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm flex items-center text-sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1.5" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}