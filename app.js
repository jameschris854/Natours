const path = require('path')
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser')
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes')
const cors = require('cors');
const app = express();

app.use(cors({
  credentials:true,
  origin:'http://localhost:5000'
}))
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'))
  
//1)GLOBAL MIDDLEWARES
//serving static files

app.use(express.static(path.join(__dirname,'public')));
//set security HTTP header
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit requist for same api
const limiter = rateLimit({
  // allows 100 reqests per ip address in 1hr
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests in this ip,please try this in an hour',
});
app.use('/api', limiter);

//Body parser, reading data from body in req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser())

//Data sanitization against noSql query injection
app.use(mongoSanitize());
//Data sanitization against xss
app.use(xss());
//parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'price',
      'difficulty',
    ],
  })
);

//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use('/',viewRouter)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   messsage: `cant find ${req.originalUrl} on the server`,
  // });
  next(new AppError(`cant find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;