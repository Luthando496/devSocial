const dotenv = require('dotenv');
const express = require('express');
const AppError = require('./Config/appError')
const morgan = require('morgan');
const user = require('./Routes/user')
// const post = require('./Routes/Post')
const DB = require('./Config/DB')
const globalErrorHandler = require('./Config/errorController');
const app = express()
dotenv.config();

DB()


app.use(express.json())


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// app.use('/api/v1/instagram/', user);
// app.use('/api/v1/instagram/', 'hel');
app.get('/',(req, res)=> res.send('hello there'))


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});




app.use(globalErrorHandler);

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});



const port = process.env.PORT || 6000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});



process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});