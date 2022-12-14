var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/user');


var app = express();

const mongoose = require("mongoose");
require("dotenv").config();
// view engine setup
app.set('view', path.join(__dirname, './src/view'));
app.set('view engine', 'pug');

app.use("/files", express.static(path.resolve(__dirname, "upload", "images"))); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

try {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("db connected");
} catch (err) {
  console.log(err);
}

app.use('/', indexRouter);
app.use('/user', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('erro');
});

module.exports = app;
