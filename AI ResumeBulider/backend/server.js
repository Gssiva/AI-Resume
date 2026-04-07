import express from 'express';
import colors from 'colors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute.js';
import resumeRoute from './Routes/resumeRoute.js';
import { notFound, otherError } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
// import path from 'path';
// import { fileURLToPath } from 'url';
import cors from 'cors';


dotenv.config(); //Load environment variables

// Temporarily hardcode environment variables for testing
process.env.SECRET_KEY = 'jwt-secret-key';
process.env.REFRESH_SECRET_KEY = 'refresh-secret-key';
process.env.PORT = '4000'; // Keep 4000 since frontend is configured for it
process.env.MONGODB_URI = 'mongodb://localhost:27017/resumebuilder';

// connectDB(); // Temporarily disabled for testing

const app = express(); // Create an Express application

// Enable CORS for all routes in development
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));



app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookie to object

// For checking whether your api is working
app.get('/', (req, res) => {
  res.send('API is working.'); // Return a response for the root path
});

app.use('/api/user', userRoute); // Register user routes under the '/api/user' path
app.use('/api/resume', resumeRoute); // Register resume routes under the '/api/resume' path

// // Serve static files from the React frontend app in production
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
//   });
// }

app.use(notFound); //error handler for undefined routes
app.use(otherError); //error handler for all other errors

const port = process.env.PORT || 4000;

// Start the server and listen on the specified port
app.listen(port, console.log(`Server running on ${port}`.cyan.underline));
