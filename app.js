
const express = require('express');
const app = express();

// http,https
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('./public/crtfiles/2_houcong.win.key');
const certficate = fs.readFileSync('./public/crtfiles/1_houcong.win_bundle.crt');
const credentials = {'key': privateKey, 'cert': certficate};

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// add Routers
const indexRouter = require('./routes/system/index');
const usersRouter = require('./routes/system/users');

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

// poems
const poemsRouter = require('./tools/register-poems-router')
poemsRouter.register(app)

// admin
const adminRouters = require('./tools/poems-admin')
adminRouters.register(app)

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const PORT = 18080;
const SSLPORT = 18081;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
