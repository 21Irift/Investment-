const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['deposit', 'withdrawal', 'transfer', 'payment'], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: String,
    paymentGateway: String,
    externalTransactionId: String,
    description: String,
    fee: { type: Number, default: 0 },
    netAmount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
