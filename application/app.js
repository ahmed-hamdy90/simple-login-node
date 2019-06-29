(function () {
  'use strict';

  // load modules
  const express = require('express');
  const path = require('path');
  const favicon = require('serve-favicon');
  const createError = require('http-errors');
  const session = require('express-session');

  const indexRouter = require('./routes/index');
  const loginRouter = require('./routes/login');
  const logoutRouter = require('./routes/logout');
  const userRouter = require('./routes/user');

  // initilaize express app
  const app = express();

  // application's port
  const port = 3030;

  // application's view engine setup
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));

  // aplication body json and url encode
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());

  // application's session setup
  //app.set('trust proxy', 1);
  app.use(session({
    secret: 'IdeaStrings Task',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 50000}
  }));

  // application's static files and yarm's dependencies folder setup
  app.use('/static', express.static(path.join(__dirname, 'public')));
  app.use(favicon(path.join(__dirname, 'public', 'images', 'icons', 'favicon.ico'))); //need check it as still not work
  app.use('/vendor', express.static(path.join(__dirname, 'vendor')));

  // application's routes
  app.use('/', indexRouter);
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/user', userRouter);
  // application handle wrong routes plus Error handler
  app.use((req, res, next) => next(createError(404)));
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {error: err.message});
  });

  // set express application to listen on spacific port
  app.listen(port, () =>  console.log(`Example app listening on port ${port}!`));
})();
