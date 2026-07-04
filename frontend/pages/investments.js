import React from 'react';

const Investments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">📈 Investment Opportunities</h1>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {[
          { name: 'Starter Package', amount: '$500 - $5,000', roi: '12% - 15%' },
          { name: 'Pro Package', amount: '$5,000 - $25,000', roi: '18% - 22%' },
          { name: 'Premium Package', amount: '$25,000+', roi: '25% - 30%' },
          { name: 'Elite Package', amount: '$100,000+', roi: '35% - 40%' },
        ].map((pkg, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md rounded-lg border border-purple-500/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">{pkg.name}</h3>
            <p className="text-gray-300 mb-2">Amount: {pkg.amount}</p>
            <p className="text-green-400 mb-4">ROI: {pkg.roi}</p>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investments;
