# 💎 Premium Investment Platform

A comprehensive full-stack investment and e-commerce platform built with modern technologies.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## ✨ Features

### User Features
- 🔐 Secure Authentication (JWT, 2FA)
- 💰 Multi-currency Digital Wallet
- 📈 Investment Packages with High ROI
- 🛒 Integrated Marketplace
- 💳 Multiple Payment Methods
- 📊 Real-time Portfolio Dashboard
- 👥 Referral Program
- 🏆 Loyalty Points System
- 📱 Responsive Design

### Admin Features
- 📊 Dashboard & Analytics
- ✅ Deposit/Withdrawal Approval
- 📢 Broadcast Notifications
- 👤 User Management
- 📋 Transaction Monitoring

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Real-time**: Socket.io
- **HTTP Client**: Axios
- **Auth**: NextAuth.js
- **Animation**: Framer Motion

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT + Passport
- **Real-time**: Socket.io
- **Validation**: Joi, Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **Payment**: Stripe
- **Cache**: Redis
- **Email**: Nodemailer

## 📁 Project Structure

```
investment-platform/
├── frontend/
│   ├── pages/
│   │   ├── index.js (Home)
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── dashboard.js
│   │   ├── wallet.js
│   │   ├── investments.js
│   │   ├── marketplace.js
│   │   ├── _app.js
│   │   └── _document.js
│   ├── styles/
│   │   └── globals.css
│   ├── components/ (to be created)
│   ├── hooks/ (to be created)
│   ├── services/ (to be created)
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── Dockerfile
│
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── users.routes.js
│   │   │   ├── wallet.routes.js
│   │   │   ├── transactions.routes.js
│   │   │   ├── investments.routes.js
│   │   │   ├── products.routes.js
│   │   │   ├── orders.routes.js
│   │   │   ├── notifications.routes.js
│   │   │   └── admin.routes.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Wallet.js
│   │   │   └── Transaction.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── middleware/ (to be created)
│   │   ├── controllers/ (to be created)
│   │   └── services/ (to be created)
│   ├── package.json
│   ├── Dockerfile
│   └── .gitignore
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js 18+
- MongoDB
- Redis (optional, for caching)
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
```

### Backend Setup

```bash
cd backend
npm install
```

## 🎯 Running the Application

### Development Mode

**Frontend**:
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

**Backend**:
```bash
cd backend
npm run dev
# Runs on http://localhost:3001
```

### Production Mode

**Frontend**:
```bash
cd frontend
npm run build
npm start
```

**Backend**:
```bash
cd backend
npm start
```

### Using Docker

```bash
docker-compose up -d
```

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh-token` - Refresh JWT token

### User Endpoints
- `GET /users/profile/:id` - Get user profile
- `PUT /users/profile/:id` - Update profile
- `POST /users/change-password` - Change password
- `POST /users/2fa/enable` - Enable 2FA

### Wallet Endpoints
- `GET /wallet/:id` - Get wallet details
- `POST /wallet/deposit` - Deposit funds
- `POST /wallet/withdraw` - Withdraw funds
- `POST /wallet/transfer` - Transfer to another user

### Investment Endpoints
- `GET /investments/packages` - Get investment packages
- `POST /investments/invest` - Create investment
- `GET /investments/history/:userId` - Get investment history

### Transaction Endpoints
- `GET /transactions` - Get all transactions
- `GET /transactions/:id` - Get transaction details

### Marketplace Endpoints
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `POST /orders` - Create order

## 🔐 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Investment Platform
```

### Backend (.env)
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/investment-platform
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
STRIPE_SECRET_KEY=your_stripe_key
NODEMAILER_EMAIL=your_email@gmail.com
NODEMAILER_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@investmentplatform.com or open an issue on GitHub.

---

**Made with ❤️ by the Investment Platform Team**
