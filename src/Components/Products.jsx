import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../redux/cartSlice';

import pic1 from '../../src/assets/img1.jpg';
import pic2 from '../../src/assets/img2.jpg';
import pic3 from '../../src/assets/img3.jpg';
import pic4 from '../../src/assets/img4.jpg';
import pic5 from '../../src/assets/img5.jpg';
import pic6 from '../../src/assets/img6.jpg';
import pic7 from '../../src/assets/img7.jpg';
import pic8 from '../../src/assets/img8.jpg';
import pic9 from '../../src/assets/img9.jpg';
import pic10 from '../../src/assets/img10.jpg';
import pic11 from '../../src/assets/img11.jpg';
import pic12 from '../../src/assets/img12.jpg';
import pic13 from '../../src/assets/img13.jpg';

const products = [
  {
    id: 1,
    name: 'BottleGourd Seeds',
    price: '149Rs',
    imageSrc: pic1,
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    color: 'Clay',
  },
  {
    id: 2,
    name: 'Pumpkin Seeds',
    price: '399Rs',
    imageSrc: pic2,
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    color: 'Green',
  },
  {
    id: 3,
    name: 'LadyFinger Seeds',
    price: '199Rs',
    imageSrc: pic3,
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    color: 'White',
  },
  {
    id: 4,
    name: 'Bean Seeds',
    price: '300Rs',
    imageSrc: pic4,
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Spinach Seeds',
    price: '150Rs',
    imageSrc: pic8,
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black',
  },
  {
    id: 6,
    name: 'Cheeku Seeds',
    price: '199Rs',
    imageSrc: pic9,
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black',
  },
  {
    id: 7,
    name: 'Green Seeds',
    price: '299Rs',
    imageSrc: pic10,
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black',
  },
  {
    id: 8,
    name: 'WaterMelon Seeds',
    price: '$35',
    imageSrc: pic11,
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'Black',
  }
];

export function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white">
      <h1 className="text-4xl font-bold text-center pt-20">Our Products</h1>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-gray-100 rounded-lg p-4 shadow-md">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg object-contain cursor-pointer group-hover:opacity-75"
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <div className="mt-4">
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.color}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                <div className="flex mt-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full sm:w-auto sm:ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center cursor-pointer"
                  >
                    Add to Cart
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

const products2 = [
  { id: 5, name: 'Basic Tee', imageSrc: pic5, imageAlt: "Front of men's Basic Tee in black.", price: '$35', color: 'Black' },
  { id: 6, name: 'Basic Tee', imageSrc: pic6, imageAlt: "Front of men's Basic Tee in black.", price: '$35', color: 'Black' },
  { id: 7, name: 'Basic Tee', imageSrc: pic7, imageAlt: "Front of men's Basic Tee in black.", price: '$35', color: 'Black' },
  { id: 8, name: 'Basic Tee', imageSrc: pic8, imageAlt: "Front of men's Basic Tee in black.", price: '$35', color: 'Black' },
  { id: 8, name: 'Basic Tee', imageSrc: pic8, imageAlt: "Front of men's Basic Tee in black.", price: '$35', color: 'Black' },
  { id: 8, name: 'Basic Tee', imageSrc: pic8, imageAlt: "Front of men's Basic Tee in black.", price: '$35', color: 'Black' }
];

export function MoreProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 mt-10 mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products2.map((product) => (
            <div key={product.id} className="group bg-gray-100 rounded-lg p-4 shadow-md">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg object-contain cursor-pointer group-hover:opacity-75"
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <div className="mt-4">
                <h3 className="text-sm text-gray-700">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.color}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                <div className="flex mt-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full sm:w-auto sm:ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
                  >
                    Add to Cart
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
