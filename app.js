
const keys          = require('./config/keys')
const mongoose      = require('mongoose')

const  url = require('url');

var createError     = require('http-errors');
var express         = require('express');
var bodyParser      = require('body-parser');

var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');

var indexRouter     = require('./routes/index');
var usersRouter     = require('./routes/users');
var coursesRouter   = require('./routes/courses')

var app = express();


mongoose.connect(keys.mongo.url,{ useNewUrlParser: true } ,()=>{
    console.log("mongoose : connect success")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);


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

console.log("Starting server ")

module.exports = app;
