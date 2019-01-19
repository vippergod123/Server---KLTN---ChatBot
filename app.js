// module
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var net = require('net');
var colors = require('colors');
// import reference


// Setup app and server 
{
  var app = express();
  
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// setup middleware
{
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
}

//  Router 
{
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);
}

// Listen socket to bot 
{
  // var http = require('http').Server(app);
  // var io = require('socket.io')(http);
  // io.on('connection', function(socket){
  //   console.log('a user connected');
  //   socket.on('chat message', (msg) => {
  //     console.log('message: ' + msg);
  //   });
  // });
}


// catch 404 and forward and error handler
{
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
  res.send(err);
});
}
module.exports = app;
