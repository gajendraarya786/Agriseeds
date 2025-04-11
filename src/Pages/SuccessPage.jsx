import React from 'react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-8">
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">Payment Successful ✅</h2>
        <p className="text-gray-600 mb-4">Thank you for your purchase!</p>
        <a href="/" className="text-green-600 underline">Go back to Home</a>
      </div>
    </div>
  );
}
