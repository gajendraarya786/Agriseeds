// 'use client'

// import { useSelector, useDispatch } from 'react-redux';
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import { removeFromCart } from '../redux/cartSlice';
// import { incrementQuantity, decrementQuantity} from '../redux/cartSlice';


// export default function Cart({ isCartOpen, setIsCartOpen }) {
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const dispatch = useDispatch();

//   const subtotal = cartItems.reduce((total, item) => {
//     const price = parseFloat(item.price.replace('$', ''));
//     return total + price * item.quantity;
//   }, 0).toFixed(2);

//   return (
//     <Dialog open={isCartOpen} onClose={() => setIsCartOpen(false)} className="relative z-100">
//       <DialogBackdrop
//         transition
//         className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
//       />

//       <div className="fixed inset-0 overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//             <DialogPanel
//               transition
//               className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
//             >
//               <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//                 <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//                   <div className="flex items-start justify-between">
//                     <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
//                     <div className="ml-3 flex h-7 items-center">
//                       <button
//                         type="button"
//                         onClick={() => setIsCartOpen(false)}
//                         className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
//                       >
//                         <span className="absolute -inset-0.5" />
//                         <span className="sr-only">Close panel</span>
//                         <XMarkIcon aria-hidden="true" className="size-6" />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="mt-8">
//                     <div className="flow-root">
//                       {cartItems.length === 0 ? (
//                         <p className="text-gray-500 text-center">Your cart is empty.</p>
//                       ) : (
//                         <ul role="list" className="-my-6 divide-y divide-gray-200">
//                           {cartItems.map((product) => (
//                             <li key={product.id} className="flex py-6">
//                               <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
//                                 <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover" />
//                               </div>

//                               <div className="ml-4 flex flex-1 flex-col">
//                                 <div>
//                                   <div className="flex justify-between text-base font-medium text-gray-900">
//                                     <h3>{product.name}</h3>
//                                     <p className="ml-4">{product.price}</p>
//                                   </div>
//                                   <p className="mt-1 text-sm text-gray-500">{product.color}</p>
//                                 </div>
//                                 <div className="flex flex-1 items-end justify-between text-sm">
//                                 <div className="flex items-center gap-2">
//   <button
//     onClick={() => dispatch(decrementQuantity(product.id))}
//     className="px-2 py-1 rounded-full border text-gray-600 hover:bg-gray-200"
//   >
//     -
//   </button>
//   <span>{product.quantity}</span>
//   <button
//     onClick={() => dispatch(incrementQuantity(product.id))}
//     className="px-2 py-1 rounded-full border text-gray-600 hover:bg-gray-200"
//   >
//     +
//   </button>
//      </div>

                                

//                                   <div className="flex">
//                                     <button
//                                       onClick={() => dispatch(removeFromCart(product.id))}
//                                       className="font-medium text-green-600 hover:text-indigo-500"
//                                     >
//                                       Remove
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {cartItems.length > 0 && (
//                   <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                     <div className="flex justify-between text-base font-medium text-gray-900">
//                       <p>Subtotal</p>
//                       <p>${subtotal}</p>
//                     </div>
//                     <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
//                     <div className="mt-6">
//                       <a
//                         href="#"
//                         className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-green-700"
//                       >
//                         Checkout
//                       </a>
//                     </div>
//                     <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                       <p>
//                         or{' '}
//                         <button
//                           type="button"
//                           onClick={() => setIsCartOpen(false)}
//                           className="font-medium text-green-600 hover:text-green-500"
//                         >
//                           Continue Shopping
//                           <span aria-hidden="true"> &rarr;</span>
//                         </button>
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </DialogPanel>
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   );
// }

'use client'

import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Cart({ isCartOpen, setIsCartOpen }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + price * item.quantity;
  }, 0).toFixed(2);

  return (
    <Dialog open={isCartOpen} onClose={() => setIsCartOpen(false)} className="relative z-100">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-center">Your cart is empty.</p>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover" />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{product.name}</h3>
                                    <p className="ml-4">{product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => dispatch(decrementQuantity(product.id))}
                                      className="px-2 py-1 rounded-full border text-gray-600 hover:bg-gray-200"
                                    >
                                      -
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button
                                      onClick={() => dispatch(incrementQuantity(product.id))}
                                      className="px-2 py-1 rounded-full border text-gray-600 hover:bg-gray-200"
                                    >
                                      +
                                    </button>
                                  </div>

                                  <div className="flex">
                                    <button
                                      onClick={() => dispatch(removeFromCart(product.id))}
                                      className="font-medium text-green-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${subtotal}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate('/checkout');
                        }}
                        className="w-full flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-green-700"
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setIsCartOpen(false)}
                          className="font-medium text-green-600 hover:text-green-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
