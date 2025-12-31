# Social Media Platform 🚀
> A robust, enterprise-grade social media backend API with real-time messaging capabilities

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-brightgreen.svg)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.x-black.svg)](https://socket.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📑 Table of Contents

- [About](#about)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
  - [REST API](#rest-api)
  - [GraphQL API](#graphql-api)
  - [WebSocket Events](#websocket-events)
- [Usage Examples](#usage-examples)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

A full-featured social media platform backend built with **TypeScript**, **Node.js**, and **Express**. This project implements a modern, scalable architecture with clean separation of concerns, following industry best practices for enterprise-level applications.

The platform supports user authentication, social networking features, real-time messaging, and provides both REST and GraphQL APIs for maximum flexibility.

### Key Highlights

- 🏗️ **Modular Architecture** - Clean separation with dedicated modules for auth, users, posts, comments, and chat
- 🔐 **Secure Authentication** - JWT-based auth with token refresh and revocation mechanisms
- 💬 **Real-time Communication** - WebSocket-powered instant messaging with Socket.io
- 📊 **Dual API Support** - Both REST and GraphQL endpoints for flexible integration
- 🎨 **Type-Safe** - Full TypeScript implementation with strict typing
- 🗄️ **MongoDB Integration** - Efficient NoSQL database with Mongoose ODM
- ☁️ **Cloud Storage** - AWS S3 integration for media uploads
- 📧 **Email Services** - Automated email notifications using Nodemailer

---

## ✨ Features

### 🔑 Authentication & Authorization
- User registration with email verification
- Secure login with JWT access & refresh tokens
- Password reset via email
- Token revocation and logout functionality
- Role-based access control (User, Admin, Moderator)

### 👤 User Management
- Complete user profiles with customizable information
- Profile picture upload to AWS S3
- Friend request system (send, accept, reject)
- Friends list management
- Privacy settings and account management

### 📝 Posts & Content
- Create posts with text and/or media attachments (up to 10 files)
- Like/unlike posts
- Tag users in posts
- Privacy controls (Public, Friends Only, Private)
- Comment permissions management
- Post pagination and filtering

### 💭 Comments
- Multi-level comment system
- Reply to comments (nested commenting)
- Media attachments in comments
- User mentions and tagging
- Like functionality on comments

### 💬 Real-time Chat
- One-on-one private messaging
- Group chat creation and management
- Real-time message delivery with Socket.io
- Online/offline status tracking
- Message history and persistence
- Group chat with custom avatars

### 🔒 Security Features
- Password hashing with bcrypt
- Phone number encryption
- Rate limiting on all endpoints
- Input validation with Zod
- SQL injection protection
- XSS prevention

---

## 🏛️ Architecture

This project follows a **modular monolithic architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                         │
│          (REST API / GraphQL / WebSocket)                │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                  API Gateway Layer                       │
│         (Express Routes / GraphQL Resolvers)             │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                 Controller Layer                         │
│          (Request/Response Handling)                     │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                  Service Layer                           │
│            (Business Logic)                              │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                Repository Layer                          │
│          (Data Access Logic)                             │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                 Database Layer                           │
│          (MongoDB with Mongoose)                         │
└─────────────────────────────────────────────────────────┘
```

### Design Patterns Used
- **Repository Pattern** - Abstraction over data access
- **Service Layer Pattern** - Business logic encapsulation
- **Dependency Injection** - Loose coupling between components
- **Factory Pattern** - Object creation (middleware, utilities)
- **Observer Pattern** - Socket.io event handling

---

## 🛠️ Tech Stack

### Backend Core
- **Runtime:** Node.js (v18+)
- **Language:** TypeScript (v5.x)
- **Framework:** Express.js (v4.x)
- **Validation:** Zod

### Database & ODM
- **Database:** MongoDB (v6.0+)
- **ODM:** Mongoose (v8.x)

### Real-time Communication
- **WebSocket:** Socket.io (v4.x)

### Authentication & Security
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Encryption:** crypto-js
- **Rate Limiting:** express-rate-limit

### File Upload & Storage
- **File Upload:** Multer
- **Cloud Storage:** AWS S3 (@aws-sdk/client-s3)

### Email Service
- **Email:** Nodemailer

### API Development
- **REST API:** Express.js
- **GraphQL:** graphql, graphql-http

### Development Tools
- **Code Quality:** ESLint, Prettier
- **Process Manager:** Nodemon
- **Logging:** Chalk
- **Environment:** dotenv

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** (v6.0 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **AWS Account** (for S3 storage) - [Sign up](https://aws.amazon.com/)
- **Git** - [Download](https://git-scm.com/)

Verify installations:

```bash
node --version  # Should be v18+
npm --version   # Should be v8+
mongod --version # Should be v6.0+
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/social-media-platform.git
cd social-media-platform
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` with your configuration (see [Environment Variables](#environment-variables) section).

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:3000` (or your configured PORT).

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000

# Database Configuration
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_CLUSTER=your_cluster_name
DB_NAME=social_media_db

# JWT Configuration
JWT_TOKEN_SECRET_KEY=your_super_secret_jwt_key_min_32_chars
JWT_ACCESS_EXPIRATION=900        # 15 minutes (in seconds)
JWT_REFRESH_EXPIRATION=604800    # 7 days (in seconds)
JWT_CONFIRM_EMAIL_EXPIRATION=3600   # 1 hour
JWT_RESET_PASSWORD_EXPIRATION=3600  # 1 hour

# Encryption
CRYPTO_SECRET_KEY=your_crypto_secret_key_for_phone_encryption
BCRYPT_SALT_ROUNDS=10

# AWS S3 Configuration
REGION=us-east-1
BUCKET_NAME=your-s3-bucket-name
ACCESS_KEY_ID=your_aws_access_key_id
SECRET_ACCESS_KEY=your_aws_secret_access_key

# Email Configuration (Gmail)
GOOGLE_EMAIL_TARNSPORTER=your-gmail@gmail.com
GOOGLE_EMAIL_TARNSPORTER_PASSWORD=your_gmail_app_password
```

### Important Notes:
- Generate secure random strings for `JWT_TOKEN_SECRET_KEY` and `CRYPTO_SECRET_KEY` (minimum 32 characters)
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833?hl=en), not your regular password
- Create an S3 bucket and IAM user with appropriate permissions for file uploads
- Never commit your `.env` file to version control

---

## 📁 Project Structure

```
social-media-platform/
├── src/
│   ├── server.ts                 # Application entry point
│   ├── app.ts                    # Express app configuration
│   │
│   ├── config/                   # Configuration files
│   │   ├── mailer.config.ts
│   │   ├── rate-limiter.config.ts
│   │   ├── s3.config.ts
│   │   └── uploader.config.ts
│   │
│   ├── database/                 # Database layer
│   │   ├── database.connection.ts
│   │   ├── database.repository.ts
│   │   └── models/
│   │       ├── user.model.ts
│   │       ├── post.model.ts
│   │       ├── comment.model.ts
│   │       ├── chat.model.ts
│   │       ├── friend-request.model.ts
│   │       └── revoked-token.model.ts
│   │
│   ├── modules/                  # Feature modules
│   │   ├── auth/                 # Authentication module
│   │   │   ├── auth.router.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.repository.ts
│   │   │   ├── auth.validator.ts
│   │   │   └── auth.dto.ts
│   │   │
│   │   ├── user/                 # User management module
│   │   │   ├── user.router.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.repository.ts
│   │   │   ├── user.validator.ts
│   │   │   └── user.dto.ts
│   │   │
│   │   ├── post/                 # Posts module
│   │   ├── comment/              # Comments module
│   │   ├── chat/                 # Chat module
│   │   │   ├── chat.router.ts
│   │   │   ├── chat.controller.ts
│   │   │   ├── chat.service.ts
│   │   │   ├── chat.repository.ts
│   │   │   ├── gateway/
│   │   │   │   ├── chat.gateway.ts
│   │   │   │   └── chat.event.ts
│   │   │   └── errors/
│   │   │
│   │   └── gateway/              # WebSocket gateway
│   │       ├── index.ts
│   │       ├── gateway.controller.ts
│   │       ├── events/
│   │       │   └── connection.event.ts
│   │       └── interfaces/
│   │           └── auth-socket.interface.ts
│   │
│   ├── graphql/                  # GraphQL implementation
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   ├── types/
│   │   ├── queries/
│   │   ├── mutations/
│   │   ├── middlewares/
│   │   └── context/
│   │
│   ├── middlewares/              # Express middlewares
│   │   ├── auth.middleware.ts
│   │   ├── socket-auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── error-handler.middleware.ts
│   │   └── not-found-handler.middleware.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── hash.util.ts
│   │   ├── token.util.ts
│   │   ├── encryption.util.ts
│   │   ├── s3.util.ts
│   │   ├── send-email.util.ts
│   │   └── uploader.util.ts
│   │
│   └── shared/                   # Shared resources
│       ├── constants/
│       ├── enums/
│       ├── types/
│       ├── errors/
│       ├── responses/
│       ├── validations/
│       ├── messages/
│       └── templates/
│
├── package.json
├── tsconfig.json
├── .env
├── .env.example
├── .gitignore
└── README.md
```

---

## 📚 API Documentation

### REST API

Base URL: `http://localhost:3000/api`

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | No |
| POST | `/auth/signin` | Login user | No |
| GET | `/auth/confirm-email?token=` | Verify email | No |
| POST | `/auth/refresh-token` | Refresh access token | No |
| POST | `/auth/forget-password` | Request password reset | No |
| POST | `/auth/reset-password?token=` | Reset password | No |
| POST | `/auth/signout` | Logout user | Yes |

#### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/profile` | Get user profile | Yes |
| POST | `/user/profile-picture` | Upload profile picture | Yes |
| PUT | `/user/update-profile` | Update profile info | Yes |
| PUT | `/user/update-password` | Change password | Yes |
| POST | `/user/friend-request/send` | Send friend request | Yes |
| PATCH | `/user/friend-request/:requestId/accept` | Accept friend request | Yes |

#### Post Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/post/create-post` | Create new post | Yes |
| GET | `/post/get-posts?page=1&limit=10` | Get posts feed | Yes |
| PATCH | `/post/:postId/like?action=LIKE` | Like/unlike post | Yes |
| PUT | `/post/update-post/:postId` | Update post | Yes |

#### Comment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/post/:postId/create-comment` | Add comment to post | Yes |
| POST | `/post/:postId/:commentId/reply` | Reply to comment | Yes |

#### Chat Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/chat/user/:userId/chat` | Get chat with user | Yes |
| GET | `/chat/group/:groupId` | Get group chat | Yes |
| POST | `/chat/group/create-group` | Create group chat | Yes |

### GraphQL API

GraphQL Endpoint: `http://localhost:3000/graphql`

#### Example Queries

**Get User Profile**
```graphql
query {
  profile {
    status
    message
    data {
      profile {
        user {
          _id
          firstName
          lastName
          email
          profilePicture
        }
        friends {
          _id
          firstName
          lastName
        }
        posts {
          _id
          content
          createdAt
        }
      }
    }
  }
}
```

**Get Posts**
```graphql
query {
  getPosts(input: { page: 1, limit: 10, availability: PUBLIC }) {
    status
    data {
      posts {
        _id
        content
        attachments
        likes {
          _id
          firstName
        }
        createdBy {
          firstName
          lastName
          profilePicture
        }
      }
      total
      totalPages
    }
  }
}
```

#### Example Mutations

**User Registration**
```graphql
mutation {
  signup(input: {
    firstName: "John"
    lastName: "Doe"
    email: "john@example.com"
    password: "SecurePass123!"
    confirmPassword: "SecurePass123!"
    gender: MALE
    birthDate: "1990-01-01"
    role: USER
  }) {
    status
    message
    data {
      verifyEmailLink
    }
  }
}
```

**Update Profile**
```graphql
mutation {
  updateProfile(input: {
    firstName: "John"
    lastName: "Smith"
    phone: "+1234567890"
  }) {
    status
    message
    data {
      user {
        firstName
        lastName
        phone
      }
    }
  }
}
```

### WebSocket Events

Connect to WebSocket: `ws://localhost:3000`

**Client → Server Events**

| Event | Payload | Description |
|-------|---------|-------------|
| `connection` | `{ authorization: "Bearer <token>" }` | Authenticate socket connection |
| `sendMessage` | `{ content: string, sendTo: string }` | Send private message |
| `sendGroupMessage` | `{ content: string, groupId: string }` | Send group message |
| `join_room` | `{ roomId: string }` | Join chat room |
| `openChat` | `{ chatId: string }` | Open specific chat |

**Server → Client Events**

| Event | Payload | Description |
|-------|---------|-------------|
| `newMessage` | `{ content, from, chatId, createdAt }` | New message received |
| `successMessage` | `{ content }` | Message sent confirmation |
| `custom_error` | `{ message }` | Error notification |

---

## 💡 Usage Examples

### Authentication Flow

```typescript
// 1. Register
const registerResponse = await fetch('http://localhost:3000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    gender: 'MALE',
    birthDate: '1990-01-01',
    role: 'USER'
  })
});

// 2. Verify email (click link sent to email)

// 3. Login
const loginResponse = await fetch('http://localhost:3000/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123!'
  })
});

const { data } = await loginResponse.json();
const { accessToken, refreshToken } = data;
```

### Creating a Post with Images

```typescript
const formData = new FormData();
formData.append('content', 'Check out my vacation photos!');
formData.append('availability', 'PUBLIC');
formData.append('allowComments', 'ALLOW');

// Add multiple images
files.forEach(file => {
  formData.append('attachments', file);
});

const response = await fetch('http://localhost:3000/api/post/create-post', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
  body: formData
});
```

### Real-time Chat with Socket.io

```typescript
import io from 'socket.io-client';

// Connect with authentication
const socket = io('http://localhost:3000', {
  auth: {
    authorization: `Bearer ${accessToken}`
  }
});

// Listen for new messages
socket.on('newMessage', (data) => {
  console.log('New message:', data);
});

// Send a private message
socket.emit('sendMessage', {
  content: 'Hello!',
  sendTo: 'user_id_here'
});

// Send a group message
socket.emit('sendGroupMessage', {
  content: 'Hello everyone!',
  groupId: 'group_id_here'
});
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

```
tests/
├── unit/
│   ├── services/
│   ├── repositories/
│   └── utils/
├── integration/
│   ├── auth.test.ts
│   ├── user.test.ts
│   └── post.test.ts
└── e2e/
    └── api.test.ts
```

### Example Test

```typescript
import { describe, it, expect } from 'vitest';
import AuthService from '../src/modules/auth/auth.service';

describe('AuthService', () => {
  it('should register a new user', async () => {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'SecurePass123!',
      // ... other fields
    };

    const result = await authService.register(userData);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string'); // verification link
  });
});
```

---

## 🚢 Deployment

### Prerequisites for Deployment

- Node.js hosting platform (Heroku, AWS, DigitalOcean, Railway, Render, etc.)
- MongoDB Atlas account (or self-hosted MongoDB)
- AWS S3 bucket
- Domain name (optional)

### Deployment Steps

1. **Build the project**

```bash
npm run build
```

2. **Set environment variables**

Configure all environment variables in your hosting platform's dashboard.

3. **Start the production server**

```bash
npm start
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t social-media-api .
docker run -p 3000:3000 --env-file .env social-media-api
```

### Recommended Platforms

- **Railway** - Easy deployment with GitHub integration
- **Render** - Free tier available, automatic deployments
- **Heroku** - Classic PaaS with simple setup
- **AWS EC2** - Full control and scalability
- **DigitalOcean App Platform** - Developer-friendly

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**

2. **Create a feature branch**

```bash
git checkout -b feature/AmazingFeature
```

3. **Commit your changes**

```bash
git commit -m 'Add some AmazingFeature'
```

4. **Push to the branch**

```bash
git push origin feature/AmazingFeature
```

5. **Open a Pull Request**

### Coding Standards

- Follow TypeScript best practices
- Use meaningful variable and function names
- Write unit tests for new features
- Update documentation for API changes
- Follow the existing code structure

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Youssef** - [@Youssef]([https://twitter.com/yourusername](https://www.linkedin.com/in/youssef-el-azab-054348356/))

Project Link: [https://github.com/yourusername/social-media-platform](https://github.com/yourusername/social-media-platform)

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Socket.io](https://socket.io/) - Real-time bidirectional communication
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Zod](https://zod.dev/) - TypeScript-first schema validation

---

<div align="center">

**Made with ❤️ by Youssef**

⭐ Star this repo if you find it useful!

</div>
