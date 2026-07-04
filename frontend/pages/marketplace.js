import React from 'react';

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">🛍️ Marketplace</h1>
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="bg-white/5 backdrop-blur-md rounded-lg border border-purple-500/20 p-4 hover:border-purple-500/50 transition">
            <div className="w-full h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Product {item}</h3>
            <p className="text-gray-400 text-sm mb-3">$49.99</p>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
