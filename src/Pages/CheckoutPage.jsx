
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '@clerk/clerk-react';

// export default function CheckoutPage() {
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const navigate = useNavigate();
//   const { user } = useUser();

//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [orderId, setOrderId] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const id = 'ORD' + Math.floor(Math.random() * 1000000);
//     setOrderId(id);
//   }, []);

//   const subtotal = cartItems
//     .reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0)
//     .toFixed(2);

//   const upiID = 'gajendraarya536@okhdfcbank';
//   const storeName = 'Agriseeds';
//   const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(storeName)}&am=${subtotal}&cu=INR`;
//   const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

//   const handleOrder = async () => {
//     if (!name || !phone) return alert("Please enter name and phone number");
//     if (!paymentMethod) return alert("Please select a payment method.");
//     if (!user) return alert("You need to login to place an order.");

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("access_key", "21f4af86-1a37-4fef-afbc-1a57896ba8ff");
//     formData.append("subject", "New Order Placed");
//     formData.append("name", name);
//     formData.append("email", user?.emailAddresses?.[0]?.emailAddress || "N/A");
//     formData.append("phone", phone);
//     formData.append("order_id", orderId);
//     formData.append("total", `₹${subtotal}`);
//     formData.append("payment_method", paymentMethod);

//     cartItems.forEach((item, i) => {
//       formData.append(`Item ${i + 1}`, `${item.name} x ${item.quantity} - ${item.price}`);
//     });

//     try {
//       const response = await fetch("https://formcarry.com/s/gnSV5VCJilC", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         navigate("/success");
//       } else {
//         const errorText = await response.text();
//         console.error("Formcarry error:", errorText);
//         alert("Order Placed Successfully");
//         navigate("/success");
//       }
//     } catch (error) {
//       console.error("Order Error:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
//         You need to login to access the checkout page.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
//       <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl space-y-6 sm:space-y-8">
//         <h2 className="text-2xl sm:text-3xl font-semibold text-center">Checkout</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
//           {/* Order Summary */}
//           <div className="bg-gray-50 p-4 rounded-xl border space-y-3 text-sm sm:text-base">
//             <p><span className="font-semibold">Order ID:</span> {orderId}</p>
//             <p><span className="font-semibold">Name:</span> {name || 'N/A'}</p>
//             <p><span className="font-semibold">Phone:</span> {phone || 'N/A'}</p>

//             <div className="space-y-1">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex justify-between">
//                   <span>{item.name} × {item.quantity}</span>
//                   <span>{item.price}</span>
//                 </div>
//               ))}
//             </div>
//             <hr />
//             <p className="font-semibold text-right">Total: ₹{subtotal}</p>
//           </div>

//           {/* Payment and Details */}
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="w-full border rounded-lg px-4 py-2"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <input
//                 type="tel"
//                 placeholder="Phone Number"
//                 className="w-full border rounded-lg px-4 py-2"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>

//             <div>
//               <h3 className="font-medium mb-2">Select Payment Method</h3>
//               <div className="flex gap-4 flex-wrap">
//                 <button
//                   className={`flex-1 px-4 py-2 rounded-lg border text-sm ${paymentMethod === 'upi' ? 'bg-green-600 text-white' : 'bg-white text-gray-800 hover:bg-green-100'}`}
//                   onClick={() => setPaymentMethod('upi')}
//                 >
//                   UPI
//                 </button>
//                 <button
//                   className={`flex-1 px-4 py-2 rounded-lg border text-sm ${paymentMethod === 'cod' ? 'bg-green-600 text-white' : 'bg-white text-gray-800 hover:bg-green-100'}`}
//                   onClick={() => setPaymentMethod('cod')}
//                 >
//                   Cash on Delivery
//                 </button>
//               </div>
//             </div>

//             {/* Payment Section */}
//             {paymentMethod === 'upi' && (
//               <div className="text-center space-y-3">
//                 <p className="text-sm sm:text-base">Scan this QR to pay ₹{subtotal}</p>
//                 <img src={qrCodeURL} alt="UPI QR" className="mx-auto w-40 sm:w-52 md:w-56" />
//                 <p className="text-sm text-gray-600">You’ll receive a confirmation email after payment.</p>
//                 <button
//                   onClick={handleOrder}
//                   disabled={loading}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm sm:text-base disabled:opacity-50"
//                 >
//                   {loading ? 'Placing Order...' : "I've Paid"}
//                 </button>
//               </div>
//             )}

//             {paymentMethod === 'cod' && (
//               <div className="text-center space-y-3">
//                 <p className="text-sm sm:text-base">You’ll pay ₹{subtotal} at delivery.</p>
//                 <p className="text-sm text-gray-600">A confirmation email will be sent once the order is placed.</p>
//                 <button
//                   onClick={handleOrder}
//                   disabled={loading}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm sm:text-base disabled:opacity-50"
//                 >
//                   {loading ? 'Placing Order...' : 'Confirm Order'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import emailjs from '@emailjs/browser';

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const { user } = useUser();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderId, setOrderId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = 'ORD' + Math.floor(Math.random() * 1000000);
    setOrderId(id);
  }, []);

  const subtotal = cartItems
    .reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0)
    .toFixed(2);

  const upiID = 'gajendraarya536@okhdfcbank';
  const storeName = 'Agriseeds';
  const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(storeName)}&am=${subtotal}&cu=INR`;
  const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

  const handleOrder = async () => {
    if (!name.trim() || !phone.trim()) {
      return alert("Please enter your name and phone number.");
    }
    if (!paymentMethod) {
      return alert("Please select a payment method.");
    }
    if (!user) {
      return alert("You must be logged in to place an order.");
    }

    setLoading(true);

    const orderDetails = cartItems.map(item => `${item.name} x ${item.quantity} - ${item.price}`).join(', ');

    const templateParams = {
      name,
      email: user?.emailAddresses?.[0]?.emailAddress || "N/A", // Customer email
      phone,
      order_id: orderId,
      total: `₹${subtotal}`,
      payment_method: paymentMethod,
      items: orderDetails,
    };

    try {
      // Send email to Admin
      const adminTemplateParams = {
        ...templateParams,
        email: "gajendra.work538@gmail.com", // Admin's email address (replace with actual admin email)
      };
      
      // Send email to Customer
      const customerTemplateParams = {
        ...templateParams,
        email: user?.emailAddresses?.[0]?.emailAddress || "N/A", // Customer's email address
      };

      // Send email to Admin
      await emailjs.send(
        'service_sbq9aid',
        'template_35t4dmn', // Your admin template ID
        adminTemplateParams,
        'YlFF86mvKXrNe3yRI'
      );

      // Send email to Customer
      await emailjs.send(
        'service_sbq9aid',
        'template_v1mamgk', // Your customer template ID
        customerTemplateParams,
        'YlFF86mvKXrNe3yRI'
      );

      navigate("/success");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        You need to login to access the checkout page.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-xl border space-y-3 text-sm sm:text-base">
            <p><span className="font-semibold">Order ID:</span> {orderId}</p>
            <p><span className="font-semibold">Name:</span> {name || 'N/A'}</p>
            <p><span className="font-semibold">Phone:</span> {phone || 'N/A'}</p>

            <div className="space-y-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
            <hr />
            <p className="font-semibold text-right">Total: ₹{subtotal}</p>
          </div>

          {/* Payment and Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg px-4 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-lg px-4 py-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">Select Payment Method</h3>
              <div className="flex gap-4 flex-wrap">
                <button
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm ${paymentMethod === 'upi' ? 'bg-green-600 text-white' : 'bg-white text-gray-800 hover:bg-green-100'}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  UPI
                </button>
                <button
                  className={`flex-1 px-4 py-2 rounded-lg border text-sm ${paymentMethod === 'cod' ? 'bg-green-600 text-white' : 'bg-white text-gray-800 hover:bg-green-100'}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  Cash on Delivery
                </button>
              </div>
            </div>

            {/* Payment Section */}
            {paymentMethod === 'upi' && (
              <div className="text-center space-y-3">
                <p className="text-sm sm:text-base">Scan this QR to pay ₹{subtotal}</p>
                <img src={qrCodeURL} alt="UPI QR" className="mx-auto w-40 sm:w-52 md:w-56" />
                <p className="text-sm text-gray-600">You’ll receive a confirmation email after payment.</p>
                <button
                  onClick={handleOrder}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm sm:text-base disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : "I've Paid"}
                </button>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="text-center space-y-3">
                <p className="text-sm sm:text-base">You’ll pay ₹{subtotal} at delivery.</p>
                <p className="text-sm text-gray-600">A confirmation email will be sent once the order is placed.</p>
                <button
                  onClick={handleOrder}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm sm:text-base disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : 'Confirm Order'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
