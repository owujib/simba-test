require('dotenv').config();

const dbConfig = {
  development: {
    username: 'root',
    password: null,
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};

let config;

if (process.env.NODE_ENV === 'development') {
  config = dbConfig.development;
} else if (process.env.NODE_ENV === 'production') {
  config = dbConfig.production;
}

module.exports = config;
