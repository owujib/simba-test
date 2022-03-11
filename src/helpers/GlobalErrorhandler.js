/**
 * @author Enang Favour <owujibfavour@gmail.com>
 * @description This file handle error messages and logs.
 * @name GlobalErrorhandler
 * @alias Error
 * @returns {import('express').ErrorRequestHandler}
 */

require('dotenv').config();
const createError = require('http-errors');
const winston = require('winston');
const ApiError = require('../utils/ApiError');
const Response = require('./Response');

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.prettyPrint(),
  colorize: true,
  json: true,
});

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ApiError(message, Response.HTTP_BAD_REQUEST);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ApiError(message, Response.HTTP_BAD_REQUEST);
};

function handleTokenExpiredError() {
  return new ApiError(
    'Invalid token. Please log in again!',
    Response.HTTP_UNAUTHORIZED,
  );
}

function handleJWTExpiredError() {
  return new ApiError(
    'Your token has expired! Please log in again.',
    Response.HTTP_UNAUTHORIZED,
  );
}

function handleNotBeforeError() {
  return new ApiError('Token not acitve.', Response.HTTP_UNAUTHORIZED);
}
const SequelizeUniqueConstraintError = (err) => {
  const value = err.errors[0].message;
  return new ApiError(
    `Duplicate field value: ${value}`,
    Response.HTTP_BAD_REQUEST,
  );
};

const sendErrorDev = (err, req, res) => {
  logger.error({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

  // A) API routes error
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      err,
      message: err.message,
      error: err.error,
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  logger.error('ERROR 💥', { ...err });

  // A) API routes
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send messagex to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err.error,
      });
    }
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(Response.HTTP_SERVICE_UNAVAILABLE).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || Response.HTTP_SERVICE_UNAVAILABLE;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 'SequelizeUniqueConstraintError')
      error = SequelizeUniqueConstraintError(error);
    // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'SequelizeValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleTokenExpiredError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (error.name === 'NotBeforeError') error = handleNotBeforeError();
    // if (error.message === "Validation Error")
    //   error = handleRequestValidationError(error, req, res);

    return sendErrorProd(error, req, res);
  }
};
