import { useState, useCallback } from 'react';
import { walletService } from '../services/api';
import useWalletStore from '../store/walletStore';

const useWallet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setWallet } = useWalletStore();

  const getWallet = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletService.getWallet(id);
      setWallet(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch wallet');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deposit = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletService.deposit(data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Deposit failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const withdraw = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletService.withdraw(data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Withdrawal failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const transfer = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await walletService.transfer(data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getWallet, deposit, withdraw, transfer, loading, error };
};

export default useWallet;
