# BankFlow — Banking Transaction & Ledger System

A backend-focused banking transaction system built with **Node.js, Express.js, and MongoDB**, designed to simulate real-world banking workflows including authentication, account management, money transfers, transaction tracking, ledger records, idempotency, and email notifications.

The project focuses on **secure API design, transaction consistency, data integrity, and backend architecture**.

---

## 🚀 Key Features

* 🔐 **JWT Authentication** — Secure user authentication and protected APIs
* 🔑 **Google OAuth** — Social authentication support
* 🏦 **Account Management** — Create and manage bank accounts
* 💸 **Money Transfers** — Transfer funds between accounts
* 📒 **Transaction Ledger** — Maintain transaction records for financial tracking
* 🛡️ **Idempotency** — Prevent duplicate transaction processing
* 📧 **Email Notifications** — Transaction-related emails using Nodemailer
* 🔒 **Protected Routes** — Authentication middleware for sensitive operations
* 🍃 **MongoDB + Mongoose** — Persistent database with schema-based models
* ⚡ **RESTful APIs** — Structured backend API architecture
* ❌ **Error Handling & Validation** — Handles invalid requests and transaction failures

---

## 🏗️ Backend Architecture

```text
Client / Postman
       │
       ▼
    Express.js
       │
       ├── Authentication
       │
       ├── Account APIs
       │
       ├── Transaction APIs
       │
       ├── Ledger
       │
       └── Email Service
              │
              ▼
        MongoDB / Mongoose
```

---

## 🔄 Transaction Flow

```text
User
 │
 ▼
Authenticate Request
 │
 ▼
Validate Transaction
 │
 ▼
Check Idempotency Key
 │
 ▼
Verify Source & Destination Accounts
 │
 ▼
Check Available Balance
 │
 ▼
Update Account Balances
 │
 ▼
Create Transaction Record
 │
 ▼
Create Ledger Entry
 │
 ▼
Send Notification
```

This flow is designed to maintain **transaction traceability and prevent accidental duplicate processing**.

---

## 🛠️ Tech Stack

| Technology    | Purpose                     |
| ------------- | --------------------------- |
| Node.js       | Backend runtime             |
| Express.js    | REST API framework          |
| MongoDB       | Database                    |
| Mongoose      | ODM and schema management   |
| JWT           | Authentication              |
| Google OAuth  | Social authentication       |
| Nodemailer    | Email notifications         |
| Cookie Parser | Cookie-based authentication |
| Postman       | API testing                 |

---

## 📂 Project Structure

```text
src/
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
│   ├── auth.route.js
│   ├── account.route.js
│   └── transaction.route.js
│
├── middleware/
│   └── auth.middleware.js
│
├── services/
│   └── email.service.js
│
├── app.js
└── server.js
```

---

## 🔐 Authentication

The application uses JWT-based authentication to protect private banking operations.

Example protected flow:

```text
Login
  ↓
JWT Generated
  ↓
JWT Stored in Cookie
  ↓
Authentication Middleware
  ↓
Protected API Access
```

Users cannot access account and transaction operations without valid authentication.

---

## 💰 Transaction Management

BankFlow supports account-to-account transfers.

A transaction contains information such as:

```text
Sender Account
Receiver Account
Amount
Transaction ID
Idempotency Key
Timestamp
Status
```

The system validates the transaction before modifying account balances.

---

## 🛡️ Idempotency

Financial APIs must protect against duplicate requests.

For example:

```text
POST /api/transactions

Idempotency-Key: TXN-12345
```

If the same request is accidentally submitted again, the system can identify the existing transaction instead of processing the transfer twice.

This is an important concept in **payment and financial systems**.

---

## 📒 Ledger

BankFlow maintains transaction records through a ledger system.

The ledger provides a historical record of financial movements and makes transactions easier to track and audit.

```text
Account A
   │
   │ Debit
   ▼
Transaction
   │
   │ Credit
   ▼
Account B
```

---

## 📧 Email Notifications

**Nodemailer** is used to send transaction-related email notifications.

Example events:

* Successful transaction
* Account-related notifications
* Transaction status updates

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd BankFlow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

### 4. Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## 🧪 API Testing

The APIs can be tested using **Postman**.

Main API groups:

```text
/api/auth
/api/accounts
/api/transactions
```

Example:

```http
POST /api/auth/login
POST /api/accounts/create
POST /api/transactions/create
```

---

## 🔒 Security Considerations

The project implements several backend security practices:

* JWT authentication
* Protected API routes
* Password hashing
* HTTP-only cookie authentication
* Input validation
* Idempotency protection
* Environment variables for secrets
* Authentication middleware

> This project is an educational banking backend and is not intended for processing real financial transactions.

---

## 🎯 What I Learned

Building BankFlow helped me understand real-world backend concepts beyond basic CRUD:

* REST API architecture
* Authentication & authorization
* MongoDB data modeling
* Financial transaction workflows
* Ledger-based accounting
* Idempotent APIs
* Middleware architecture
* Email services
* Backend validation
* Error handling
* API testing with Postman

---

## 🔮 Future Improvements

* MongoDB transactions using sessions
* Role-based access control
* Transaction pagination and filtering
* Rate limiting
* Redis-based caching
* Automated unit & integration tests
* Docker containerization
* API documentation with Swagger
* Transaction reconciliation
* Production monitoring and logging

---

## 👨‍💻 Author

**Avinash Kumar**

Final Year B.Tech CSE Student

### Connect

* **GitHub:** `https://github.com/rajavinash123`
* **Portfolio:** `https://avinashkumar-gray.vercel.app`

---

## ⭐ Project Highlights

**BankFlow demonstrates practical backend engineering skills in:**

`Node.js` • `Express.js` • `MongoDB` • `JWT` • `OAuth` • `REST APIs` • `Ledger Systems` • `Idempotency` • `Nodemailer` • `Backend Security`

If you found this project useful, consider giving it a ⭐ on GitHub.
