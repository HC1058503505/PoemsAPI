
var express = require('express');
var app = express();

// http,https
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('./public/crtfiles/2_houcong.win.key');
var certficate = fs.readFileSync('./public/crtfiles/1_houcong.win_bundle.crt');
var credentials = {'key': privateKey, 'cert': certficate};

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// add Routers
var indexRouter = require('./routes/system/index');
var usersRouter = require('./routes/system/users');

// poems Routers
var poemsRouter = require('./routes/poems/poems');
var poetsRouter = require('./routes/poems/poets');
var booksRouter = require('./routes/poems/books');
var sentencesRouter = require('./routes/poems/sentences');
var booksCatalogueRouter = require('./routes/poems/bookscatalogue');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// system route
app.use('/', indexRouter);
app.use('/users', usersRouter);

// poems route
app.use('/poems',poemsRouter);
app.use('/poets',poetsRouter);
app.use('/books',booksRouter);
app.use('/sentences',sentencesRouter);
app.use('/bookscatalogue',booksCatalogueRouter);

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


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 18080;
var SSLPORT = 18081;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
