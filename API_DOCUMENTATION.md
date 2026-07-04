# API Routes Documentation

## Authentication Routes

### Register
- **Endpoint**: `POST /api/auth/register`
- **Description**: Register a new user account
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: User object with JWT token

### Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate user and get JWT token
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: User object with JWT token

## User Routes

### Get Profile
- **Endpoint**: `GET /api/users/profile/:id`
- **Description**: Get user profile information
- **Auth**: Required
- **Response**: User object

### Update Profile
- **Endpoint**: `PUT /api/users/profile/:id`
- **Description**: Update user profile
- **Auth**: Required
- **Body**: User fields to update

## Wallet Routes

### Get Wallet
- **Endpoint**: `GET /api/wallet/:id`
- **Description**: Get wallet details
- **Auth**: Required
- **Response**: Wallet object

### Deposit
- **Endpoint**: `POST /api/wallet/deposit`
- **Description**: Deposit funds to wallet
- **Auth**: Required
- **Body**:
  ```json
  {
    "amount": 1000,
    "paymentMethod": "stripe"
  }
  ```

### Withdrawal
- **Endpoint**: `POST /api/wallet/withdraw`
- **Description**: Withdraw funds from wallet
- **Auth**: Required
- **Body**:
  ```json
  {
    "amount": 500,
    "bankAccountId": "account_id"
  }
  ```

## Investment Routes

### Get Packages
- **Endpoint**: `GET /api/investments/packages`
- **Description**: Get available investment packages
- **Response**: Array of investment packages

### Create Investment
- **Endpoint**: `POST /api/investments/invest`
- **Description**: Create a new investment
- **Auth**: Required
- **Body**:
  ```json
  {
    "packageId": "package_id",
    "amount": 5000,
    "duration": 12
  }
  ```

## Transaction Routes

### Get Transactions
- **Endpoint**: `GET /api/transactions`
- **Description**: Get all transactions for user
- **Auth**: Required
- **Query**: `?page=1&limit=10&type=deposit`

### Get Transaction Details
- **Endpoint**: `GET /api/transactions/:id`
- **Description**: Get specific transaction details
- **Auth**: Required

## Admin Routes

### Dashboard Statistics
- **Endpoint**: `GET /api/admin/dashboard/stats`
- **Description**: Get dashboard statistics
- **Auth**: Required (Admin only)
- **Response**: Statistics object

### Get Pending Deposits
- **Endpoint**: `GET /api/admin/deposits/pending`
- **Description**: Get pending deposit requests
- **Auth**: Required (Admin only)

### Approve Deposit
- **Endpoint**: `POST /api/admin/deposits/:id/approve`
- **Description**: Approve pending deposit
- **Auth**: Required (Admin only)
- **Body**:
  ```json
  {
    "status": "approved"
  }
  ```

---

**Note**: All endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```
