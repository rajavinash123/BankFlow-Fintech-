# 🏦 Bank Transaction System

A backend-focused **Bank Transaction Management System** built with **Node.js, Express.js, MongoDB, and Mongoose**.

The project focuses on implementing real-world backend concepts such as **authentication, account management, money transfers, transactions, ledgers, idempotency, validation, and data integrity**.

## 🚀 Features

* User registration and login
* JWT-based authentication
* Protected API routes
* Bank account creation
* Account balance management
* Account-to-account money transfer
* Transaction history
* Ledger management
* Debit and credit tracking
* Idempotency key support
* Transaction status management
* MongoDB data validation
* Immutable ledger entries
* Error handling and API validation
* Password hashing with bcrypt
* Email functionality using Nodemailer
* Google OAuth authentication

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JWT
* bcrypt / bcryptjs
* Google OAuth
* Environment variables

### Other

* Nodemailer
* REST APIs
* Git & GitHub

## 📂 Project Structure

```text
Backend/
│
├── controllers/
│   ├── auth.controller.js
│   ├── account.controller.js
│   └── transaction.controller.js
│
├── models/
│   ├── user.model.js
│   ├── account.model.js
│   ├── transaction.model.js
│   └── ledger.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── account.routes.js
│   └── transaction.routes.js
│
├── middleware/
│   └── auth.middleware.js
│
├── services/
│
├── config/
│
├── app.js
├── server.js
├── package.json
└── .env
```

## 🔄 Transaction Flow

A typical account-to-account transfer follows this flow:

```text
User
  ↓
Authentication
  ↓
Transfer Request
  ↓
Validate Sender & Receiver
  ↓
Check Account Balance
  ↓
Check Idempotency Key
  ↓
Debit Sender Account
  ↓
Credit Receiver Account
  ↓
Create Transaction Record
  ↓
Create Ledger Entries
  ↓
Transaction Completed
```

## 💰 Ledger Concept

The system maintains separate ledger entries for the accounts involved in a transfer.

Example:

```text
Avinash Account
    ↓
DEBIT ₹1,000
Balance After: ₹4,000

        ↓ Transfer ₹1,000 ↓

Rahul Account
    ↓
CREDIT ₹1,000
Balance After: ₹3,000
```

This provides a clear financial history for each account.

## 🔐 Idempotency

The transaction system uses an `idempotencyKey` to prevent accidental duplicate transactions.

For example:

```text
Request 1
₹1,000 transfer
Idempotency Key: ABC123
        ↓
Transaction created

Request 2
₹1,000 transfer
Idempotency Key: ABC123
        ↓
Duplicate request detected
        ↓
No second transfer
```

This is important for reliable payment and banking systems where a client may retry the same request because of network failures.

## 📊 Transaction Model

A transaction contains information such as:

```text
fromAccount
toAccount
amount
idempotencyKey
status
currency
createdAt
updatedAt
```

Possible transaction states:

```text
pending
completed
failed
cancelled
```

## 📒 Ledger Model

Each ledger entry records the effect of a transaction on an account.

```text
account
transaction
amount
type
balanceAfter
currency
createdAt
updatedAt
```

Ledger types:

```text
CREDIT
DEBIT
```

Ledger entries are designed to be **immutable** so historical financial records cannot be modified or deleted through normal update/delete operations.

## 🔑 Environment Variables

Create a `.env` file:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASS=your_app_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> Never commit `.env` or other secrets to GitHub.

## ▶️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Go to the backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create your `.env` file and add the required environment variables.

Start the development server:

```bash
npm run dev
```

## 🧪 API Examples

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Account

```http
POST /api/account/create
GET  /api/account
```

### Transaction

```http
POST /api/transaction/transfer
GET  /api/transaction/history
```

> Update the endpoint names above according to the actual routes implemented in the project.

## 🧠 Backend Concepts Demonstrated

This project is not only a CRUD application. It demonstrates practical backend engineering concepts:

* REST API architecture
* MVC-style project structure
* Authentication & authorization
* JWT
* Password hashing
* MongoDB relationships using ObjectId references
* Mongoose schemas and validation
* Middleware
* Transaction processing
* Financial ledger design
* Idempotency
* Data integrity
* Immutable records
* Error handling
* Environment-based configuration
* Email integration
* OAuth

## 🎯 What I Learned

While building this project, I focused on understanding how a real-world backend handles sensitive operations such as authentication and financial transactions.

The project helped me understand the difference between:

```text
Account
   ↓
Current financial state

Transaction
   ↓
A financial operation

Ledger
   ↓
Permanent financial history
```

I also learned why concepts such as **idempotency, atomic operations, validation, and immutable financial records** are important in production backend systems.

## 🔮 Future Improvements

* MongoDB sessions and atomic transactions for transfers
* Refresh token architecture
* Rate limiting
* API documentation with Swagger
* Automated testing
* Docker support
* Transaction pagination
* Audit logs
* Admin dashboard
* Improved fraud detection
* Production deployment

## 👨‍💻 Developer

**Avinash Kumar**

Computer Science Engineering Student | Full Stack Developer

Interested in:

* Backend Development
* MERN Stack
* REST APIs
* Database Design
* GenAI
* Software Development

### Connect

* GitHub: https://github.com/rajavinash123
* LinkedIn: https://www.linkedin.com/in/av/
* Portfolio: https://avinashkumar-gray.vercel.app/

---

⭐ If you find this project useful, consider giving it a star.
