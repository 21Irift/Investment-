import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 backdrop-blur-md bg-black/20 border-b border-purple-500/20">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          💎 Investment Platform
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-2 rounded-lg border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Grow Your Wealth
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Invest & Earn
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Premium investment platform with secure wallet, multiple payment options, and guaranteed returns
        </p>
        <button
          onClick={() => router.push('/register')}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
        >
          Get Started Now
        </button>
      </section>

      {/* Features */}
      <section className="px-8 py-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { icon: '💰', title: 'Secure Wallet', desc: 'Multi-currency wallet with bank-level security' },
          { icon: '📈', title: 'High ROI', desc: 'Attractive returns on your investments' },
          { icon: '🔒', title: 'Verified', desc: 'Fully licensed and regulated platform' },
        ].map((feature, i) => (
          <div key={i} className="p-6 bg-white/5 backdrop-blur-md rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
