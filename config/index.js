const dotenv = require('dotenv').config();

  module.exports = {
    port: process.env.PORT,
    cookieKey: process.env.APP_COOKIE_KEY
};