const Notification = require('../models/Notification');

const getNotifications = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ user: req.params.userId })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Notification.countDocuments({ user: req.params.userId });
    const unread = await Notification.countDocuments({
      user: req.params.userId,
      read: false,
    });

    res.status(200).json({
      notifications,
      unread,
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

const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({
      message: 'Notification marked as read',
      notification,
    });
  } catch (error) {
    next(error);
  }
};

const clearAllNotifications = async (req, res, next) => {
  try {
    await Notification.deleteMany({ user: req.params.userId });

    res.status(200).json({ message: 'All notifications cleared' });
  } catch (error) {
    next(error);
  }
};

const createNotification = async (userId, title, message, type = 'info') => {
  try {
    const notification = new Notification({
      user: userId,
      title,
      message,
      type,
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  clearAllNotifications,
  createNotification,
};
