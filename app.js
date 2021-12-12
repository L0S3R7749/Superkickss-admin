const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('./middlewares/passport');
const session = require('express-session');
const flash = require('express-flash');

require('dotenv').config();

const mainRoute = require('./components/mainRoute');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // One day
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req,res,next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', mainRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// connect to database
mongoose.connect(
   process.env.DB_CONNECT,
   { useUnifiedTopology: true, useNewUrlParser: true },
   () => console.log("DB Connected"));

module.exports = app;
