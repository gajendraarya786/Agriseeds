'use client';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) clearInterval(timer);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Scan to Pay</h2>
        <p className="text-gray-600 mb-4">Use any UPI app to scan and pay</p>

        {/* Real UPI QR Code */}
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=gajendraarya536@okhdfcbank&pn=Your%20Name&am=100"
          alt="UPI QR Code"
          className="mx-auto mb-4"
        />

        {/* Countdown timer */}
        {timeLeft > 0 ? (
          <p className="text-sm text-gray-500 mb-2">Waiting for payment... {timeLeft}s</p>
        ) : (
          <p className="text-sm text-red-500 mb-2">Time expired. Please try again.</p>
        )}

        {/* I've Paid button */}
        <button
          onClick={() => navigate('/success')}
          disabled={timeLeft === 0}
          className={`mt-4 w-full px-4 py-2 rounded-md text-white transition ${
            timeLeft === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          I’ve Paid
        </button>
      </div>
    </div>
  );
}
