# AI ResumeBuilder

An intelligent AI-powered resume builder web application built with the MERN stack that helps users create professional, optimized resumes with advanced features including AI-generated content, multiple templates, and export capabilities.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Description

AI ResumeBuilder is a modern web application that leverages artificial intelligence to help job seekers create professional, compelling resumes. The platform provides intelligent suggestions for content optimization, multiple professional templates, and seamless export options to PDF format. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it offers a responsive, user-friendly interface with real-time preview capabilities.

### Technologies Used:
- **Frontend**: React 18, Redux Toolkit, React Bootstrap, Axios
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **PDF Generation**: jsPDF, html2canvas, Puppeteer
- **Development Tools**: Concurrently, Nodemon

## Features

### 🚀 Core Features
- **AI-Powered Content Generation**: Smart suggestions for bullet points and descriptions
- **Multiple Professional Templates**: Choose from various industry-standard resume templates
- **Real-time Preview**: See changes instantly as you edit
- **PDF Export**: Download professional PDF resumes
- **User Authentication**: Secure login and registration system
- **Resume Management**: Save, edit, and delete multiple resumes

### 🎨 Design Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI/UX**: Clean, intuitive interface with React Bootstrap
- **Drag & Drop**: Easy section reordering
- **Live Validation**: Real-time form validation and error handling

### 🔧 Technical Features
- **RESTful API**: Well-structured backend endpoints
- **State Management**: Redux Toolkit for efficient state handling
- **Database Integration**: MongoDB for scalable data storage
- **Security**: Password hashing with bcrypt, JWT authentication

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher  
- **MongoDB**: Local installation or MongoDB Atlas account
- **Git**: For cloning the repository

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: Minimum 2GB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/AI-ResumeBuilder.git
   cd AI-ResumeBuilder
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   
   # Install backend dependencies (handled by root npm install)
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit the .env file with your configuration
   notepad .env  # On Windows
   # or
   nano .env     # On macOS/Linux
   ```

## How to Run

### Development Mode

1. **Start the application**
   ```bash
   # From the root directory, run both frontend and backend
   npm run dev
   ```
   
   This will concurrently start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

2. **Alternative: Run separately**
   ```bash
   # Terminal 1 - Start backend
   npm run server
   
   # Terminal 2 - Start frontend  
   npm run client
   ```

### Production Mode

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run server` | Start only the backend server with nodemon |
| `npm run client` | Start only the frontend development server |
| `npm start` | Start the production server |
| `npm run clean:build` | Clean the frontend build directory |

## Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ai-resumebuilder
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ai-resumebuilder

# JWT Configuration
SECRET_KEY=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# PDF Generation (optional)
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

### Environment Variables Description

- `MONGODB_URI`: MongoDB connection string (local or Atlas)
- `SECRET_KEY`: Secret key for JWT token generation (use a strong, random string)
- `JWT_EXPIRE`: JWT token expiration time (default: 7d)
- `PORT`: Backend server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)
- `FRONTEND_URL`: Frontend application URL for CORS configuration

## Deployment

### Deploy to Vercel (Frontend)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy frontend**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure environment variables in Vercel dashboard**

### Deploy to Heroku (Full Stack)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

4. **Add MongoDB addon**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set environment variables**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set NODE_ENV=production
   ```

6. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Deploy to AWS (EC2 + S3)

1. **Build frontend for production**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload build to S3**
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

3. **Deploy backend to EC2**
   ```bash
   # Clone repository on EC2
   git clone your-repo-url
   cd AI-ResumeBuilder
   
   # Install dependencies and build
   npm install
   cd frontend && npm install && npm run build && cd ..
   
   # Start with PM2
   npm install -g pm2
   pm2 start backend/server.js --name "ai-resumebuilder"
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm install
   
   COPY . .
   
   WORKDIR /app/frontend
   RUN npm install && npm run build
   
   WORKDIR /app
   EXPOSE 5000
   
   CMD ["npm", "start"]
   ```

2. **Build and run**
   ```bash
   docker build -t ai-resumebuilder .
   docker run -p 5000:5000 ai-resumebuilder
   ```

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Resume Endpoints
- `GET /api/resume` - Get all resumes for user
- `POST /api/resume` - Create new resume
- `GET /api/resume/:id` - Get specific resume
- `PUT /api/resume/:id` - Update resume
- `DELETE /api/resume/:id` - Delete resume
- `POST /api/resume/:id/export` - Export resume to PDF

### AI Content Endpoints
- `POST /api/ai/generate-summary` - Generate AI-powered summary
- `POST /api/ai/improve-content` - Improve existing content
- `POST /api/ai/suggest-skills` - Get skill suggestions

## Dependencies

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-bootstrap": "^2.7.4",
  "bootstrap": "^5.2.3",
  "react-router-dom": "^6.11.2",
  "@reduxjs/toolkit": "^1.9.5",
  "react-redux": "^8.0.7",
  "axios": "^1.4.0",
  "react-scripts": "^5.0.1"
}
```

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.2.0",
  "bcrypt": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5",
  "nodemon": "^2.0.22",
  "concurrently": "^8.0.1",
  "jspdf": "^4.2.1",
  "html2canvas": "^1.4.1",
  "puppeteer": "^24.40.0"
}
```

## Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Error
**Problem**: `MongooseServerSelectionError: Could not connect to any servers`

**Solution**:
- Ensure MongoDB is running locally or check Atlas connection string
- Verify network connectivity
- Check if MongoDB credentials are correct

#### 2. Port Already in Use
**Problem**: `Error: listen EADDRINUSE :::5000`

**Solution**:
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # macOS/Linux

# Kill the process
taskkill /PID <PID> /F         # Windows
kill -9 <PID>                  # macOS/Linux
```

#### 3. Frontend Dependency Issues
**Problem**: Various npm installation errors

**Solution**:
```bash
# Clean install
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Install specific package if needed
npm install @svgr/webpack --save-dev
```

#### 4. JWT Token Errors
**Problem**: `JsonWebTokenError: invalid signature`

**Solution**:
- Ensure SECRET_KEY is set correctly in .env
- Check if token is expired
- Verify token format in headers

#### 5. CORS Issues
**Problem**: `Access-Control-Allow-Origin` error

**Solution**:
- Set FRONTEND_URL environment variable
- Check CORS configuration in backend
- Ensure frontend URL is whitelisted

### Performance Optimization

1. **Frontend Optimization**
   - Use React.memo for component optimization
   - Implement code splitting with React.lazy
   - Optimize images and assets

2. **Backend Optimization**
   - Add database indexes for frequent queries
   - Implement caching with Redis
   - Use compression middleware

3. **Database Optimization**
   - Create proper indexes
   - Use aggregation pipelines for complex queries
   - Implement connection pooling

### Getting Help

If you encounter issues not covered here:

1. Check the [Issues](https://github.com/your-username/AI-ResumeBuilder/issues) page on GitHub
2. Search existing issues before creating a new one
3. Provide detailed error messages and steps to reproduce
4. Include your system information (OS, Node.js version, etc.)

## Contributing

We welcome contributions to AI ResumeBuilder! Here's how you can contribute:

### Development Workflow

1. **Fork the repository**
   ```bash
   # Fork on GitHub and clone your fork
   git clone https://github.com/your-username/AI-ResumeBuilder.git
   cd AI-ResumeBuilder
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Test your changes**
   ```bash
   # Run tests
   npm test
   
   # Run linting
   npm run lint
   
   # Test the application
   npm run dev
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots if applicable

### Code Style Guidelines

- Use ES6+ syntax
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Report Issues

When reporting bugs, please include:

- Detailed description of the issue
- Steps to reproduce
- Expected vs actual behavior
- System information
- Screenshots if applicable

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

### License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## Contact

### Project Maintainer
- **Name**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [@your-username](https://github.com/your-username)

### Support

For questions and support:

- 📧 Email: support@ai-resumebuilder.com
- 💬 Discord: [Join our community](https://discord.gg/your-invite)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/AI-ResumeBuilder/issues)
- 📖 Documentation: [Project Wiki](https://github.com/your-username/AI-ResumeBuilder/wiki)

### Social Media

- 🐦 Twitter: [@AIResumebuilder](https://twitter.com/AIResumebuilder)
- 📸 Instagram: [@ai_resumebuilder](https://instagram.com/ai_resumebuilder)
- 💼 LinkedIn: [AI ResumeBuilder](https://linkedin.com/company/ai-resumebuilder)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Bootstrap](https://getbootstrap.com/) - UI framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Backend framework
- [OpenAI](https://openai.com/) - AI powering features

## 📊 Project Stats

- **Version**: 1.0.0
- **Last Updated**: 2024
- **Contributors**: [Contributors list](https://github.com/your-username/AI-ResumeBuilder/graphs/contributors)
- **Stars**: [⭐ Star this repo](https://github.com/your-username/AI-ResumeBuilder)
