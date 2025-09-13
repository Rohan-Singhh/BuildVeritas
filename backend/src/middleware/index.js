/**
 * Middleware initialization
 */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT || 100, // Limit each IP
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
});

// CORS Configuration
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://build-veritas.vercel.app',
        'https://buildveritas.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

const initializeMiddleware = (app) => {
    app.use(helmet()); // Security headers
    app.use(cors(corsOptions)); // Enable CORS with specific options
    app.use(morgan('dev')); // Logging
    app.use(express.json()); // Parse JSON bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    app.use('/api', limiter); // Apply rate limiting to all API routes
};

module.exports = {
    initializeMiddleware
};