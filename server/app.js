var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
// 引入mongoose
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var config = require('./config');

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});

var index = require('./routes/index');
var users = require('./routes/users');

var songRouter = require('./routes/songRouter');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 跨域
app.use(cors());

// passport config
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// 加入dish
app.use('/songs', songRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//allow custom header and CORS
// app.all('*',function (req, res, next) {
//   req.header('Access-Control-Allow-Origin', '*');
//   req.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, x-access-token');
//   req.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

//   if (req.method == 'OPTIONS') {
//     res.send(200); /让options请求快速返回/
//   }
//   else {
//     next();
//   }
// });

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
