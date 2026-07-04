import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Service
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  refreshToken: (refreshToken) => api.post('/auth/refresh-token', { refreshToken }),
};

// User Service
export const userService = {
  getProfile: (id) => api.get(`/users/profile/${id}`),
  updateProfile: (id, data) => api.put(`/users/profile/${id}`, data),
  changePassword: (data) => api.post('/users/change-password', data),
  enable2FA: () => api.post('/users/2fa/enable'),
  disable2FA: () => api.post('/users/2fa/disable'),
};

// Wallet Service
export const walletService = {
  getWallet: (id) => api.get(`/wallet/${id}`),
  deposit: (data) => api.post('/wallet/deposit', data),
  withdraw: (data) => api.post('/wallet/withdraw', data),
  transfer: (data) => api.post('/wallet/transfer', data),
  addBankAccount: (data) => api.post('/wallet/bank-account', data),
};

// Transaction Service
export const transactionService = {
  getAllTransactions: (params) => api.get('/transactions', { params }),
  getTransactionDetails: (id) => api.get(`/transactions/${id}`),
  downloadReport: (params) => api.get('/transactions/report/download', { params }),
};

// Investment Service
export const investmentService = {
  getPackages: () => api.get('/investments/packages'),
  invest: (data) => api.post('/investments/invest', data),
  getInvestmentHistory: (userId) => api.get(`/investments/history/${userId}`),
  calculateROI: (data) => api.post('/investments/calculate-roi', data),
};

// Product Service
export const productService = {
  getAllProducts: (params) => api.get('/products', { params }),
  getProductDetails: (id) => api.get(`/products/${id}`),
  searchProducts: (q) => api.get('/products/search', { params: { q } }),
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),
};

// Order Service
export const orderService = {
  getUserOrders: (userId, params) => api.get(`/orders/${userId}`, { params }),
  createOrder: (data) => api.post('/orders', data),
  getOrderDetails: (orderId) => api.get(`/orders/details/${orderId}`),
  generateReceipt: (orderId) => api.get(`/orders/${orderId}/receipt`),
};

// Notification Service
export const notificationService = {
  getNotifications: (userId, params) => api.get(`/notifications/${userId}`, { params }),
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  clearAllNotifications: (userId) => api.delete(`/notifications/${userId}`),
};

// Admin Service
export const adminService = {
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  getPendingDeposits: () => api.get('/admin/deposits/pending'),
  approveDeposit: (id) => api.post(`/admin/deposits/${id}/approve`),
  rejectDeposit: (id) => api.post(`/admin/deposits/${id}/reject`),
  getPendingWithdrawals: () => api.get('/admin/withdrawals/pending'),
  approveWithdrawal: (id) => api.post(`/admin/withdrawals/${id}/approve`),
  rejectWithdrawal: (id) => api.post(`/admin/withdrawals/${id}/reject`),
  sendBroadcast: (data) => api.post('/admin/broadcast', data),
};

export default api;
