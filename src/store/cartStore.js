// src/store/cartStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) => set((state) => {
        const productId = product.id || product._id;
        const existingItem = state.cartItems.find(item => item.id === productId);

        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item =>
              item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        } else {
          return {
            cartItems: [...state.cartItems, { ...product, id: productId, quantity: 1 }]
          };
        }
      }),

      removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== productId)
      })),

      incrementQuantity: (productId) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      })),

      decrementQuantity: (productId) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      })),

      getSubtotal: () => {
        return get().cartItems.reduce((total, item) => {
          let price;
          if (item.price.includes('$')) {
            price = parseFloat(item.price.replace('$', ''));
          } else if (item.price.includes('Rs')) {
            price = parseFloat(item.price.replace('Rs', ''));
          } else {
            price = parseFloat(item.price);
          }
          return total + price * item.quantity;
        }, 0).toFixed(2);
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
