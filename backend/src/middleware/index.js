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
// More permissive CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Always allow in development
        if (process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }

        // Allow requests with no origin (like mobile apps, Postman, or curl requests)
        if (!origin) {
            return callback(null, true);
        }

        const allowedOrigins = [
            // Local development
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:3000',
            
            // Production domains
            'https://build-veritas.vercel.app',
            'https://buildveritas.vercel.app',
            
            // Backend domain
            'https://buildveritas.onrender.com',
            'https://buildveritas-backend.onrender.com'
        ];

        // Allow all Vercel preview deployments and local development
        if (
            origin.endsWith('.vercel.app') || 
            origin.includes('localhost') || 
            origin.includes('127.0.0.1') ||
            allowedOrigins.includes(origin)
        ) {
            callback(null, true);
        } else {
            console.log('⚠️ Blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Origin',
        'X-Requested-With',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers'
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400, // 24 hours
    preflightContinue: false
};

const initializeMiddleware = (app) => {
    // Configure Helmet with CORS-friendly settings
    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: ["'self'", "https://*.vercel.app", "http://localhost:*", "https://*.onrender.com"],
                imgSrc: ["'self'", "data:", "https:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                fontSrc: ["'self'", "data:", "https:"],
                mediaSrc: ["'self'", "data:", "https:"]
            }
        }
    }));
    app.use(cors(corsOptions)); // Enable CORS with specific options
    app.use(morgan('dev')); // Logging
    app.use(express.json()); // Parse JSON bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    app.use('/api', limiter); // Apply rate limiting to all API routes
};

module.exports = {
    initializeMiddleware
};