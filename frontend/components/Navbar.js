import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    router.push('/');
  };

  return (
    <nav className="flex justify-between items-center px-8 py-6 backdrop-blur-md bg-black/20 border-b border-purple-500/20">
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        💎 Investment Platform
      </Link>

      <div className="hidden md:flex gap-6">
        {localStorage.getItem('token') ? (
          <>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
            <Link href="/wallet" className="text-gray-300 hover:text-white transition">
              Wallet
            </Link>
            <Link href="/investments" className="text-gray-300 hover:text-white transition">
              Investments
            </Link>
            <Link href="/marketplace" className="text-gray-300 hover:text-white transition">
              Marketplace
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-300 hover:text-white transition">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
