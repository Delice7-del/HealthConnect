# HealthConnect - Full Stack Health Education Platform

A comprehensive health education platform built with Node.js, Express, MongoDB, and modern frontend technologies.

## 🚀 Features

### Frontend
- **Modern UI/UX**: Beautiful, responsive design using Tailwind CSS
- **Multi-language Support**: English, Spanish, French, German
- **Health Conditions**: Comprehensive information about common health conditions
- **First Aid Guides**: Step-by-step emergency procedures
- **Clinic Finder**: Locate nearby healthcare providers
- **SMS Notifications**: Real-time health updates and reminders
- **Contact System**: Easy communication with healthcare providers

### Backend
- **RESTful API**: Complete CRUD operations for all resources
- **Authentication & Authorization**: JWT-based security with role-based access
- **Email Integration**: Automated email notifications using Nodemailer
- **SMS Integration**: Twilio-powered SMS notifications
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting, input validation
- **File Upload**: Support for images and documents

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Tailwind CSS for styling
- Font Awesome for icons
- Responsive design

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer
- **SMS**: Twilio
- **Validation**: express-validator
- **Security**: Helmet, CORS, rate limiting
- **File Upload**: Multer

## 📁 Project Structure

```
HealthConnect/
├── public/                 # Frontend files
│   └── index.html         # Main HTML file
├── models/                # Database models
│   ├── User.js
│   ├── HealthCondition.js
│   └── Clinic.js
├── routes/                # API routes
│   ├── auth.js
│   ├── users.js
│   ├── healthConditions.js
│   ├── clinics.js
│   ├── notifications.js
│   ├── contact.js
│   └── firstAid.js
├── middleware/            # Custom middleware
│   ├── auth.js
│   └── errorHandler.js
├── utils/                 # Utility functions
│   ├── email.js
│   └── sms.js
├── uploads/              # File uploads
├── server.js             # Main server file
├── package.json          # Dependencies
├── config.env            # Environment variables
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HealthConnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the config file
   cp config.env.example config.env
   
   # Edit config.env with your values
   nano config.env
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if local)
   mongod
   
   # Or use MongoDB Atlas
   # Update MONGODB_URI in config.env
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Frontend: `http://localhost:5000`
   - API: `http://localhost:5000/api`
   - Health Check: `http://localhost:5000/api/health`

## 🔧 Configuration

### Environment Variables

Create a `config.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/healthconnect
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/healthconnect

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Twilio Configuration (SMS)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/verify/:token` | Verify email |
| POST | `/api/auth/forgot-password` | Request password reset |
| PUT | `/api/auth/reset-password/:token` | Reset password |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### Health Conditions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health-conditions` | Get all conditions |
| GET | `/api/health-conditions/:id` | Get specific condition |
| POST | `/api/health-conditions` | Create condition (Admin) |
| PUT | `/api/health-conditions/:id` | Update condition (Admin) |
| DELETE | `/api/health-conditions/:id` | Delete condition (Admin) |

### Clinics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/clinics` | Get all clinics |
| GET | `/api/clinics/:id` | Get specific clinic |
| POST | `/api/clinics` | Create clinic |
| PUT | `/api/clinics/:id` | Update clinic |
| POST | `/api/clinics/:id/reviews` | Add review |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/notifications/subscribe` | Subscribe to SMS |
| PUT | `/api/notifications/preferences` | Update preferences |
| GET | `/api/notifications/preferences` | Get preferences |

### Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |

### First Aid

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/first-aid` | Get all guides |
| GET | `/api/first-aid/:id` | Get specific guide |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **user**: Regular user with basic access
- **admin**: Full access to all features
- **healthcare_provider**: Can manage clinics and health information

## 📱 SMS Notifications

The platform supports SMS notifications using Twilio:

1. Sign up for a Twilio account
2. Get your Account SID and Auth Token
3. Update the config.env file
4. Users can subscribe to SMS notifications

## 📧 Email Notifications

Email notifications are sent using Nodemailer:

1. Configure your email provider (Gmail recommended)
2. Update the config.env file with email credentials
3. Users receive verification and notification emails

## 🗄️ Database Models

### User Model
- Basic info (name, email, password)
- Health profile (age, gender, blood type, allergies)
- Emergency contacts
- Notification preferences
- Role-based access

### HealthCondition Model
- Condition details (name, description, symptoms)
- Treatment information
- Severity and category
- Multi-language support
- Resources and images

### Clinic Model
- Clinic information (name, type, specialties)
- Address and contact details
- Operating hours
- Services and insurance
- Reviews and ratings

## 🚀 Deployment

### Heroku Deployment

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI_PROD=your_mongodb_atlas_uri
   # Add other environment variables
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: support@healthconnect.com

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Real-time chat with healthcare providers
- [ ] Telemedicine integration
- [ ] Health tracking and analytics
- [ ] AI-powered health recommendations
- [ ] Integration with wearable devices
- [ ] Video consultations
- [ ] Prescription management
- [ ] Health insurance integration

---

**HealthConnect** - Your Health, Our Priority 🏥 