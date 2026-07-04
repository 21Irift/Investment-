const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    package: { type: String, required: true },
    amount: { type: Number, required: true },
    roi: { type: Number, required: true },
    duration: { type: Number, default: 12 },
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
    startDate: { type: Date, default: Date.now },
    expectedMaturityDate: Date,
    actualMaturityDate: Date,
    earnedProfit: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Investment', investmentSchema);
