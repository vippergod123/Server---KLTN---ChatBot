//module
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessions = require('express-session');
var bodyParser = require('body-parser');
var passport = require("./models/passport");
var cors = require('cors');

//#region setup app and middleware 
var app = express();




app.use(sessions({  
  secret: '(!)*#(!JE)WJEqw09ej12',
  resave: false,
  saveUninitialized: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//#region cors

var whitelist = ['http://localhost:3000', 'http://localhost:3002','https://admin-college-handbook.herokuapp.com','https://client-college-handbook.herokuapp.com','https://collegehandbook074.firebaseapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
}

app.use('/*',cors(corsOptions))

//#endregion 


//#region setup authentication passport
app.use(passport.initialize());
app.use(passport.session())
//#endregion 

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//#endregion


//  Router 
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

//authentication 
var signinRouter = require('./routes/authentication/signin');
app.use('/signin', signinRouter);

var signupRouter = require('./routes/authentication/signup');
app.use('/signup', signupRouter);

var signoutRouter = require('./routes/authentication/signout');
app.use('/signout', signoutRouter);


//bot
var botRouter = require('./routes/bot/bot');
app.use('/bot', botRouter);

//admin 
var conversationRouter = require('./routes/conversation/conversation');
app.use('/admin/manager/conversation', conversationRouter);

var newsManagerRouter = require('./routes/admin/newsManager');
app.use('/admin/manager/news', newsManagerRouter);

var reportManager = require('./routes/admin/reportManager');
app.use('/admin/manager/report', reportManager);

var qnaManagerRouter = require('./routes/admin/qnaManager');
app.use('/admin/manager/qna', qnaManagerRouter);

var sendMailRouter = require('./routes/mail/sendmail');
app.use('/sendmail', sendMailRouter);

//client
var newsRouter = require('./routes/client/news');
app.use('/client/news', newsRouter);

var postRouter = require('./routes/client/post');
app.use('/client/post', postRouter);

var reportRouter = require('./routes/client/report');
app.use('/client/report', reportRouter);

var commentRouter = require('./routes/client/comment_post');
app.use('/client/comment_post', commentRouter);

var hcmusRouter = require('./routes/client/hcmus');
app.use('/client/hcmus', hcmusRouter);



//#region catch 404 and forward and error handler

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
//#endregion

module.exports = app;