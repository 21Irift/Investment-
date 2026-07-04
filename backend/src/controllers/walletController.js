const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

const getWallet = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ user: req.params.id }).populate('user', 'firstName lastName email');
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }
    res.status(200).json(wallet);
  } catch (error) {
    next(error);
  }
};

const deposit = async (req, res, next) => {
  try {
    const { amount, paymentMethod } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Create transaction
    const transaction = new Transaction({
      wallet: wallet._id,
      user: req.user.id,
      type: 'deposit',
      amount,
      paymentMethod,
      status: 'pending',
    });

    await transaction.save();

    res.status(201).json({
      message: 'Deposit initiated',
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

const withdraw = async (req, res, next) => {
  try {
    const { amount, bankAccountId } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    if (wallet.availableBalance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Create transaction
    const transaction = new Transaction({
      wallet: wallet._id,
      user: req.user.id,
      type: 'withdrawal',
      amount,
      status: 'pending',
      description: `Withdrawal to bank account ${bankAccountId}`,
    });

    await transaction.save();

    // Freeze balance
    wallet.frozenBalance += amount;
    await wallet.save();

    res.status(201).json({
      message: 'Withdrawal initiated',
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

const transfer = async (req, res, next) => {
  try {
    const { recipientEmail, amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const senderWallet = await Wallet.findOne({ user: req.user.id });
    const recipientWallet = await Wallet.findOne({ user: recipient._id });

    if (!senderWallet || !recipientWallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    if (senderWallet.availableBalance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct from sender
    senderWallet.balance -= amount;
    senderWallet.availableBalance -= amount;
    await senderWallet.save();

    // Add to recipient
    recipientWallet.balance += amount;
    recipientWallet.availableBalance += amount;
    await recipientWallet.save();

    // Create transactions
    const senderTransaction = new Transaction({
      wallet: senderWallet._id,
      user: req.user.id,
      type: 'transfer',
      amount,
      status: 'completed',
      description: `Transfer to ${recipient.firstName} ${recipient.lastName}`,
    });

    const recipientTransaction = new Transaction({
      wallet: recipientWallet._id,
      user: recipient._id,
      type: 'transfer',
      amount,
      status: 'completed',
      description: `Transfer from ${req.user.firstName || 'User'}`,
    });

    await senderTransaction.save();
    await recipientTransaction.save();

    res.status(200).json({
      message: 'Transfer successful',
      transaction: senderTransaction,
    });
  } catch (error) {
    next(error);
  }
};

const addBankAccount = async (req, res, next) => {
  try {
    const { accountHolder, bankName, accountNumber } = req.body;

    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    wallet.bankAccounts.push({
      accountHolder,
      bankName,
      accountNumber,
      verified: false,
      primary: wallet.bankAccounts.length === 0,
    });

    await wallet.save();

    res.status(201).json({
      message: 'Bank account added',
      wallet,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWallet,
  deposit,
  withdraw,
  transfer,
  addBankAccount,
};
