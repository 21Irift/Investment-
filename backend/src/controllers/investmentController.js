const Investment = require('../models/Investment');
const Wallet = require('../models/Wallet');

const packages = [
  { id: 1, name: 'Starter', minAmount: 500, maxAmount: 5000, roi: 12, duration: 12 },
  { id: 2, name: 'Pro', minAmount: 5000, maxAmount: 25000, roi: 18, duration: 12 },
  { id: 3, name: 'Premium', minAmount: 25000, maxAmount: 100000, roi: 25, duration: 12 },
  { id: 4, name: 'Elite', minAmount: 100000, maxAmount: Infinity, roi: 35, duration: 12 },
];

const getPackages = async (req, res, next) => {
  try {
    res.status(200).json(packages);
  } catch (error) {
    next(error);
  }
};

const invest = async (req, res, next) => {
  try {
    const { packageId, amount, duration } = req.body;

    const selectedPackage = packages.find((p) => p.id == packageId);
    if (!selectedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    if (amount < selectedPackage.minAmount || amount > selectedPackage.maxAmount) {
      return res.status(400).json({
        message: `Amount must be between $${selectedPackage.minAmount} and $${selectedPackage.maxAmount}`,
      });
    }

    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet || wallet.availableBalance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct from wallet
    wallet.availableBalance -= amount;
    wallet.frozenBalance += amount;
    await wallet.save();

    // Create investment
    const investment = new Investment({
      user: req.user.id,
      package: selectedPackage.name,
      amount,
      roi: selectedPackage.roi,
      duration: duration || selectedPackage.duration,
      status: 'active',
      startDate: new Date(),
      expectedMaturityDate: new Date(Date.now() + (duration || selectedPackage.duration) * 30 * 24 * 60 * 60 * 1000),
    });

    await investment.save();

    res.status(201).json({
      message: 'Investment created successfully',
      investment,
    });
  } catch (error) {
    next(error);
  }
};

const getInvestmentHistory = async (req, res, next) => {
  try {
    const investments = await Investment.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(investments);
  } catch (error) {
    next(error);
  }
};

const calculateROI = async (req, res, next) => {
  try {
    const { amount, roi, duration } = req.body;

    const monthlyROI = (amount * roi) / 100 / 12;
    const totalReturn = amount + monthlyROI * duration;
    const profit = totalReturn - amount;

    res.status(200).json({
      amount,
      roi,
      duration,
      monthlyROI: monthlyROI.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      profit: profit.toFixed(2),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPackages,
  invest,
  getInvestmentHistory,
  calculateROI,
};
