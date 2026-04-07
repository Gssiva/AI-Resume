# AI ResumeBuilder - Frontend

The frontend application for AI ResumeBuilder, built with React 18, Redux Toolkit, and Bootstrap. This provides a modern, responsive user interface for creating AI-powered professional resumes.

## 🚀 Features

### Core Functionality
- **Resume Builder**: Intuitive drag-and-drop resume creation interface
- **AI Content Generation**: Smart suggestions for bullet points and descriptions
- **Real-time Preview**: Live preview of your resume as you edit
- **Multiple Templates**: Choose from various professional resume templates
- **PDF Export**: Download your resume as a professional PDF

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Authentication**: Secure user login and registration
- **State Management**: Efficient state handling with Redux Toolkit
- **Form Validation**: Real-time validation and error handling
- **Modern UI**: Clean interface with React Bootstrap components

## 🛠 Technologies Used

- **React 18**: Modern React with hooks and concurrent features
- **Redux Toolkit**: Efficient state management
- **React Router DOM**: Client-side routing
- **React Bootstrap**: UI component library
- **Axios**: HTTP client for API requests
- **Bootstrap 5**: CSS framework for responsive design

## 📋 Prerequisites

Before running the frontend, ensure you have:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **Backend API**: The backend server should be running on http://localhost:5000

## 🚀 Getting Started

### Installation

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode on http://localhost:3000 |
| `npm test` | Launches the test runner in interactive watch mode |
| `npm run build` | Builds the app for production to the `build` folder |
| `npm run eject` | Ejects from Create React App (one-way operation) |

## 🏗 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components (Header, Footer, etc.)
│   │   ├── forms/          # Form components
│   │   └── resume/         # Resume-specific components
│   ├── pages/              # Page components
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   └── ResumeBuilder.js
│   ├── store/              # Redux store configuration
│   │   ├── slices/         # Redux slices
│   │   └── store.js        # Main store configuration
│   ├── services/           # API services
│   │   └── api.js          # Axios configuration
│   ├── utils/              # Utility functions
│   ├── styles/             # CSS and SCSS files
│   ├── App.js              # Main App component
│   └── index.js            # Entry point
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=10000

# Feature Flags
REACT_APP_ENABLE_AI_FEATURES=true
REACT_APP_ENABLE_ANALYTICS=false

# Application Settings
REACT_APP_NAME=AI ResumeBuilder
REACT_APP_VERSION=1.0.0
```

### API Configuration

The frontend communicates with the backend API through the configured service:

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🎨 UI Components

### Resume Builder Components

- **ResumeEditor**: Main editor interface with drag-and-drop functionality
- **TemplateSelector**: Component for choosing resume templates
- **SectionEditor**: Individual section editors (Experience, Education, Skills)
- **PreviewPanel**: Real-time resume preview
- **ExportOptions**: PDF export functionality

### Common Components

- **Header**: Navigation header with user menu
- **Footer**: Application footer with links
- **LoadingSpinner**: Loading indicator component
- **ErrorMessage**: Error display component
- **Modal**: Reusable modal component

## 📱 Responsive Design

The frontend is built with a mobile-first approach:

- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Grid System**: Bootstrap's responsive grid system
- **Touch Support**: Optimized for touch interactions on mobile devices

## 🔒 Authentication

The frontend handles authentication through:

- **JWT Tokens**: Stored in localStorage
- **Protected Routes**: Route guards for authenticated pages
- **Auto-refresh**: Token refresh mechanism
- **Logout**: Secure logout with token cleanup

## 📊 State Management

Using Redux Toolkit for efficient state management:

```javascript
// Example slice
import { createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    currentResume: null,
    templates: [],
    loading: false,
    error: null,
  },
  reducers: {
    setResume: (state, action) => {
      state.currentResume = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Test Structure

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API service tests
- **E2E Tests**: End-to-end user flow tests

## 🚀 Deployment

### Build for Production

```bash
# Build the application
npm run build

# The build files will be in the `build` directory
```

### Deployment Options

1. **Vercel**: Recommended for React applications
2. **Netlify**: Static site hosting
3. **AWS S3 + CloudFront**: Scalable hosting
4. **Docker**: Containerized deployment

#### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Proxy Issues
**Problem**: API calls failing due to CORS

**Solution**: 
- Ensure backend is running on port 5000
- Check CORS configuration on backend
- Verify API_URL in .env file

#### 2. Build Failures
**Problem**: `npm run build` fails

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run build
```

#### 3. Memory Issues
**Problem**: Out of memory errors during build

**Solution**:
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Performance Optimization

1. **Code Splitting**: Use React.lazy for route-based splitting
2. **Bundle Analysis**: Analyze bundle size with webpack-bundle-analyzer
3. **Image Optimization**: Use optimized images and lazy loading
4. **Caching**: Implement proper caching strategies

## 📚 Resources

- [React Documentation](https://reactjs.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Create React App Documentation](https://create-react-app.dev/)

## 🤝 Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Create pull requests with clear descriptions

## 📄 License

This frontend is part of the AI ResumeBuilder project, licensed under the ISC License.

---

**Built with ❤️ for AI ResumeBuilder**
