const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    balance: { type: Number, default: 0 },
    availableBalance: { type: Number, default: 0 },
    frozenBalance: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    totalDeposits: { type: Number, default: 0 },
    totalWithdrawals: { type: Number, default: 0 },
    bankAccounts: [{
      accountHolder: String,
      bankName: String,
      accountNumber: String,
      verified: Boolean,
      primary: Boolean,
    }],
    cryptoWallets: [{
      type: String,
      address: String,
      verified: Boolean,
      balance: Number,
    }],
    status: { type: String, enum: ['active', 'frozen', 'closed'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wallet', walletSchema);
