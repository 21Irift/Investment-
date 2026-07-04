const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const Order = require('../models/Order');
const Investment = require('../models/Investment');
const { createNotification } = require('./notificationController');

const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const totalTransactions = await Transaction.countDocuments();
    const totalDeposits = await Transaction.aggregate([
      { $match: { type: 'deposit', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalWithdrawals = await Transaction.aggregate([
      { $match: { type: 'withdrawal', status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalOrders = await Order.countDocuments();
    const totalInvestments = await Investment.countDocuments();

    res.status(200).json({
      totalUsers,
      activeUsers,
      totalTransactions,
      totalDeposits: totalDeposits[0]?.total || 0,
      totalWithdrawals: totalWithdrawals[0]?.total || 0,
      totalOrders,
      totalInvestments,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, status } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (status) query.status = status;

    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.status(200).json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPendingDeposits = async (req, res, next) => {
  try {
    const deposits = await Transaction.find({
      type: 'deposit',
      status: 'pending',
    })
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json(deposits);
  } catch (error) {
    next(error);
  }
};

const approveDeposit = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.type !== 'deposit') {
      return res.status(400).json({ message: 'This is not a deposit transaction' });
    }

    // Update transaction status
    transaction.status = 'completed';
    await transaction.save();

    // Add funds to wallet
    const wallet = await Wallet.findById(transaction.wallet);
    wallet.balance += transaction.amount;
    wallet.availableBalance += transaction.amount;
    wallet.totalDeposits += transaction.amount;
    await wallet.save();

    // Create notification
    await createNotification(
      transaction.user,
      'Deposit Approved',
      `Your deposit of $${transaction.amount} has been approved`,
      'success'
    );

    res.status(200).json({
      message: 'Deposit approved successfully',
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

const rejectDeposit = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.status = 'failed';
    await transaction.save();

    // Create notification
    await createNotification(
      transaction.user,
      'Deposit Rejected',
      `Your deposit of $${transaction.amount} has been rejected`,
      'error'
    );

    res.status(200).json({
      message: 'Deposit rejected',
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

const getPendingWithdrawals = async (req, res, next) => {
  try {
    const withdrawals = await Transaction.find({
      type: 'withdrawal',
      status: 'pending',
    })
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json(withdrawals);
  } catch (error) {
    next(error);
  }
};

const approveWithdrawal = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.type !== 'withdrawal') {
      return res.status(400).json({ message: 'This is not a withdrawal transaction' });
    }

    // Update transaction status
    transaction.status = 'completed';
    await transaction.save();

    // Deduct frozen balance from wallet
    const wallet = await Wallet.findById(transaction.wallet);
    wallet.frozenBalance -= transaction.amount;
    wallet.totalWithdrawals += transaction.amount;
    await wallet.save();

    // Create notification
    await createNotification(
      transaction.user,
      'Withdrawal Approved',
      `Your withdrawal of $${transaction.amount} has been processed`,
      'success'
    );

    res.status(200).json({
      message: 'Withdrawal approved successfully',
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

const rejectWithdrawal = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    transaction.status = 'failed';
    await transaction.save();

    // Unfreeze balance
    const wallet = await Wallet.findById(transaction.wallet);
    wallet.frozenBalance -= transaction.amount;
    wallet.availableBalance += transaction.amount;
    await wallet.save();

    // Create notification
    await createNotification(
      transaction.user,
      'Withdrawal Rejected',
      `Your withdrawal of $${transaction.amount} has been rejected`,
      'error'
    );

    res.status(200).json({
      message: 'Withdrawal rejected',
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

const sendBroadcast = async (req, res, next) => {
  try {
    const { title, message, type = 'info' } = req.body;

    // Get all users
    const users = await User.find({ status: 'active' });

    // Send notification to all users
    const notifications = await Promise.all(
      users.map((user) =>
        createNotification(user._id, title, message, type)
      )
    );

    res.status(200).json({
      message: `Broadcast sent to ${notifications.length} users`,
      count: notifications.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getPendingDeposits,
  approveDeposit,
  rejectDeposit,
  getPendingWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
  sendBroadcast,
};
