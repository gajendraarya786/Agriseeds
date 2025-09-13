import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance.js';
import useCartStore from '../store/cartStore';
import emailjs from '@emailjs/browser';
import { useAuthStore } from '../store/authStore';
import { 
  ShoppingCart, 
  User, 
  Phone, 
  CreditCard, 
  Truck, 
  QrCode,
  Check,
  Lock,
  Mail,
  Package
} from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, getSubtotal } = useCartStore();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderId, setOrderId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = 'ORD' + Math.floor(Math.random() * 1000000);
    setOrderId(id);
    
    // Pre-fill name if user is logged in
    if (user && user.fullname) {
      setName(user.fullname);
    }
  }, [user]);

  const subtotal = getSubtotal();

  const upiID = 'gajendraarya536@okhdfcbank';
  const storeName = 'Agriseeds';
  const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(storeName)}&am=${subtotal}&cu=INR`;
  const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

  const handleOrder = async () => {
    if (!name.trim() || !phone.trim()) {
      return alert('Please enter your name and phone number.');
    }
    if (!paymentMethod) {
      return alert('Please select a payment method.');
    }
    if (!isAuthenticated) {
      return alert('You must be logged in to place an order.');
    }

    setLoading(true);

    const orderDetails = cartItems.map(item => `${item.name} x ${item.quantity} - ${item.price}`).join(', ');
    const customerEmail = user?.email || 'N/A';

    const templateParams = {
      name,
      email: customerEmail,
      phone,
      order_id: orderId,
      total: `₹${subtotal}`,
      payment_method: paymentMethod,
      items: orderDetails,
      to_email: customerEmail,
    };
    
    console.log("Sending customer email to:", customerEmail);
    console.log("Email parameters:", templateParams);

    try {
      await emailjs.send(
        'service_sbq9aid',
        'template_35t4dmn',
        { ...templateParams, to_email: 'gajendra.work538@gmail.com' },
        'YlFF86mvKXrNe3yRI'
      );

      // Customer Email
      await emailjs.send(
        'service_sbq9aid',
        'template_v1mamgk',
        { ...templateParams, to_email: customerEmail },
        'YlFF86mvKXrNe3yRI'
      );
      
      await axiosInstance.post('/orders', {
        userId: user._id,
        orderId,
        name,
        phone,
        email: customerEmail,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal: `₹${subtotal}`,
        paymentMethod
      }, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().tokens?.accessToken}`
        }
      });

      navigate('/success');
    } catch (error) {
      console.error('Order Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center max-w-md w-full border border-red-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Access Required</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">You need to login to access the checkout page.</p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-3 sm:mb-4 shadow-lg">
            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Secure Checkout
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Complete your order in just a few steps</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                1
              </div>
              <span className="ml-1 sm:ml-2 text-green-600 font-semibold text-xs sm:text-sm">Cart</span>
            </div>
            <div className="w-8 sm:w-16 h-1 bg-green-600 rounded"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                2
              </div>
              <span className="ml-1 sm:ml-2 text-green-600 font-semibold text-xs sm:text-sm">Checkout</span>
            </div>
            <div className="w-8 sm:w-16 h-1 bg-gray-200 rounded"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs sm:text-sm">
                3
              </div>
              <span className="ml-1 sm:ml-2 text-gray-500 text-xs sm:text-sm">Complete</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-100 lg:sticky lg:top-8">
              <div className="flex items-center mb-6">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 sm:mr-3" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Order Summary</h2>
              </div>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border-l-4 border-green-500">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-base">{orderId}</p>
                </div>
                
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border-l-4 border-blue-500">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Customer</p>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{name || 'Not provided'}</p>
                  {phone && <p className="text-xs sm:text-sm text-gray-600">{phone}</p>}
                </div>
              </div>

              <div className="border-t pt-3 sm:pt-4 mb-4 sm:mb-6">
                <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Items</h3>
                <div className="space-y-2 sm:space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id || item._id} className="flex justify-between items-center py-1 sm:py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm">{item.name}</p>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-black-600 text-xs sm:text-sm">₹{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-3 sm:pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-bold text-gray-800">Total</span>
                  <span className="text-lg sm:text-2xl font-bold text-black-600">₹{subtotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center">
                <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 mr-2 sm:mr-3" />
                Payment Details
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {/* Personal Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 border-b pb-2">Payment Method</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      type="button"
                      className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 group ${
                        paymentMethod === 'upi' 
                          ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg transform scale-105' 
                          : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                      }`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 ${
                          paymentMethod === 'upi' ? 'bg-green-500' : 'bg-gray-100 group-hover:bg-green-100'
                        }`}>
                          <QrCode className={`w-5 h-5 sm:w-6 sm:h-6 ${paymentMethod === 'upi' ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">UPI Payment</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Pay instantly via UPI</p>
                      </div>
                      {paymentMethod === 'upi' && (
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 group ${
                        paymentMethod === 'cod' 
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg transform scale-105' 
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                      }`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 ${
                          paymentMethod === 'cod' ? 'bg-blue-500' : 'bg-gray-100 group-hover:bg-blue-100'
                        }`}>
                          <Truck className={`w-5 h-5 sm:w-6 sm:h-6 ${paymentMethod === 'cod' ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Cash on Delivery</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Pay when delivered</p>
                      </div>
                      {paymentMethod === 'cod' && (
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Payment Section */}
                {paymentMethod === 'upi' && (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200">
                    <div className="text-center space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-center mb-4">
                        <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2" />
                        <h4 className="text-base sm:text-lg font-semibold text-green-800">UPI Payment</h4>
                      </div>
                      <p className="text-green-700 font-medium text-sm sm:text-base">Scan this QR code to pay ₹{subtotal}</p>
                      
                      <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg inline-block">
                        <img 
                          src={qrCodeURL} 
                          alt="UPI QR Code" 
                          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto"
                        />
                      </div>
                      
                      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-200">
                        <div className="flex items-center justify-center mb-2">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">Email Confirmation</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">You'll receive a confirmation email after successful payment.</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleOrder}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed text-sm sm:text-base"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                            Placing Order...
                          </div>
                        ) : (
                          "I've Completed Payment"
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200">
                    <div className="text-center space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-center mb-4">
                        <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
                        <h4 className="text-base sm:text-lg font-semibold text-blue-800">Cash on Delivery</h4>
                      </div>
                      <p className="text-blue-700 font-medium text-sm sm:text-base">You'll pay ₹{subtotal} when your order arrives</p>
                      
                      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200">
                        <div className="flex items-center justify-center mb-2">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">Order Confirmation</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">A confirmation email will be sent once your order is placed successfully.</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleOrder}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed text-sm sm:text-base"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                            Placing Order...
                          </div>
                        ) : (
                          'Confirm Order'
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <div className="text-xs sm:text-sm">
                      <p className="font-medium text-gray-800">Secure & Safe</p>
                      <p className="text-gray-600">Your information is protected with end-to-end encryption</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}