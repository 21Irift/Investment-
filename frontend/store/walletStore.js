import { create } from 'zustand';

const useWalletStore = create((set) => ({
  wallet: null,
  balance: 0,
  loading: false,

  setWallet: (wallet) => set({ wallet, balance: wallet?.availableBalance || 0 }),
  setLoading: (loading) => set({ loading }),
}));

export default useWalletStore;
