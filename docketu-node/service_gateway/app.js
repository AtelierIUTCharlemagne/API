const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const usersAdminRouter = require('./routes/admin');
const eventsRouter = require('./routes/events');
// const eventAnnexRouter = require('./routes/events_annex');

const app = express();
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const authMiddleware = require('./middlewares/auth');

app.use(authMiddleware);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', usersAdminRouter);
app.use('/events', eventsRouter);
// app.use('/events_annex', eventAnnexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: "Error" });
});

console.log("service gateway up");

module.exports = app;
