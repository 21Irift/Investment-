const Transaction = require('../models/Transaction');

const getAllTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const skip = (page - 1) * limit;

    const query = { user: req.user.id };
    if (type) query.type = type;

    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      transactions,
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

const getTransactionDetails = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('wallet');
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

const downloadReport = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const query = { user: req.user.id };
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(query).sort({ createdAt: -1 });

    // Generate CSV
    let csv = 'Date,Type,Amount,Status,Description\n';
    transactions.forEach((t) => {
      csv += `"${t.createdAt.toLocaleDateString()}","${t.type}","${t.amount}","${t.status}","${t.description || ''}"
`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTransactions,
  getTransactionDetails,
  downloadReport,
};
