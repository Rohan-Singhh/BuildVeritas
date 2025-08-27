const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));

  // Rate Limiting (optional tweak as per requirements)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100 // 100 requests per 15 min, tweak as needed
  });
  app.use(limiter);
};
