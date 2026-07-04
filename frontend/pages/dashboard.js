import React from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();

  const stats = [
    { label: 'Total Balance', value: '$15,250.50', icon: '💰' },
    { label: 'Active Investments', value: '5', icon: '📈' },
    { label: 'Monthly ROI', value: '+$1,245.75', icon: '📊' },
    { label: 'Referral Earnings', value: '$450.00', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="px-8 py-6 backdrop-blur-md bg-black/20 border-b border-purple-500/20 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 text-gray-300 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="px-8 py-8 grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-white/5 backdrop-blur-md rounded-lg border border-purple-500/20">
            <div className="text-3xl mb-3">{stat.icon}</div>
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="px-8 py-8 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { title: 'Wallet', icon: '🏦', href: '/wallet' },
          { title: 'Investments', icon: '💎', href: '/investments' },
          { title: 'Marketplace', icon: '🛍️', href: '/marketplace' },
        ].map((action, i) => (
          <button
            key={i}
            onClick={() => router.push(action.href)}
            className="p-8 bg-white/5 backdrop-blur-md rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition text-center"
          >
            <div className="text-5xl mb-4">{action.icon}</div>
            <h3 className="text-xl font-semibold text-white">{action.title}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
