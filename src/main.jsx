import React from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Redux Provider
import store from './redux/store';      // Import your Redux store
import App from './App.jsx';
import './index.css';

const PUBLISHABLE_KEY = "pk_test_bmVhcmJ5LWhhbXN0ZXItODAuY2xlcmsuYWNjb3VudHMuZGV2JA";
console.log("Clerk Publishable Key:", PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = document.getElementById('root');

if (!root) {
  console.error("Root element not found");
} else {
  createRoot(root).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}> {/* Wrap App with Redux Provider */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  );
}
