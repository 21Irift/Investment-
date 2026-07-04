const Order = require('../models/Order');
const Product = require('../models/Product');
const Wallet = require('../models/Wallet');

const getUserOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.params.userId })
      .populate('items.product')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments({ user: req.params.userId });

    res.status(200).json({
      orders,
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

const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    let totalAmount = 0;
    const orderItems = [];

    // Validate and prepare items
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Check wallet balance
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet || wallet.availableBalance < totalAmount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct from wallet
    wallet.availableBalance -= totalAmount;
    wallet.balance -= totalAmount;
    await wallet.save();

    // Create order
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'completed',
      status: 'processing',
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderDetails = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const generateReceipt = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('user items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    let receipt = `
    ========================================
    RECEIPT
    ========================================
    Order ID: ${order._id}
    Date: ${order.createdAt.toLocaleDateString()}
    
    Customer: ${order.user.firstName} ${order.user.lastName}
    Email: ${order.user.email}
    
    --------Items--------
    `;

    order.items.forEach((item) => {
      receipt += `
    ${item.product.name}
    Quantity: ${item.quantity} x $${item.price} = $${item.quantity * item.price}
    `;
    });

    receipt += `
    --------Total--------
    Subtotal: $${order.totalAmount}
    Total: $${order.totalAmount}
    
    Payment Method: ${order.paymentMethod}
    Status: ${order.status}
    ========================================
    `;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=receipt-${order._id}.txt`);
    res.send(receipt);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserOrders,
  createOrder,
  getOrderDetails,
  generateReceipt,
};
