const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');
const { sequelize } = require('./models');
const GlobalErrorhandler = require('./helpers/GlobalErrorhandler');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.globalErrorHandler();
    this.database();
  }

  middlewares() {
    this.server.use(logger('dev'));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cookieParser());
    this.server.use(express.static(path.join(__dirname, 'public')));
  }

  routes() {
    //this.server.use(routes);
    this.server.use('/', webRoutes);
    this.server.use('/api', apiRoutes);
  }
  globalErrorHandler() {
    this.server.use(GlobalErrorhandler);
  }

  database() {
    sequelize
      .authenticate()
      .then(() => {
        console.info('Database connection is successful');
      })
      .catch((err) => console.error('Database connection error: ', err));
  }
}

module.exports = new App().server;
