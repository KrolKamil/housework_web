const express = require('express');
const bodyParser = require('body-parser');
const user = require('./controllers/app/user');
const cors = require('cors');

const corsOptions = {
  origin: true,
  credentials: true
};

const app = () => {
  const app = express();
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    console.log(req.body);
    next();
  });
  app.use((error, req, res, next) => {
    res.status(400).json({
      type: 'error',
      message: error.type || 'unknown error'
    });
  });
  app.get('/', (req, res) => { res.send('Hello World'); });
  app.post('/user/login', user.login);
  app.post('/user/register', user.register);
  return app;
};

module.exports = app;
