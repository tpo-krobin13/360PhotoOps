const dotenv = require('dotenv').config();

  module.exports = {
    port: process.env.PORT,
    cookieKey: process.env.APP_COOKIE_KEY,
    _3CommasAPIKey: process.env._3CommasAPIKey,
    _3CommasSecret: process.env._3CommasSecret
};