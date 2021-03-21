const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { find } = require('../models/tourModel');
const User = require('../models/userModel');
 const axios = require('axios')


exports.getOverview = catchAsync(async (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src-elem 'self' cdnjs.cloudflare.com"
  );

  //1) Get tour data from collection
  const tours = await Tour.find();
  //2) Build Template

  //3)Render that template using data from collection

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src-elem 'self' cdnjs.cloudflare.com"
  );

  // 1) GET THE DATA ,FOR THE REQUESTED
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next(new AppError('There is no tour with that name',404));
  }
  //BUILD TEMPLATE
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getloginForm = catchAsync(async (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src-elem 'self' cdnjs.cloudflare.com"
  );
  res.status(200).render('login', {
    title: 'log into your account',
  });
});

exports.getSignupForm = catchAsync(async (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src-elem 'self' cdnjs.cloudflare.com"
  );
  res.status(200).render('signup', {
    title: 'create a new account',
  });
});

exports.getAccount = catchAsync(async(req,res) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src-elem 'self' cdnjs.cloudflare.com"
  );

  // const account = await User.findOne()

  res.status(200).render('account', {
    title: 'Your account',
  });
})

exports.getAccountReviews = catchAsync(async(req,res) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src-elem 'self' cdnjs.cloudflare.com"
  );
  // const userAll = await axios({
  //   method: 'get',
  //   url: `http://localhost:5000/api/v1/users/${req.params.id}`,
  // });
  const userAll = await User.findById(req.params.id).populate('reviews').populate('tour');
    console.log(userAll);
  res.status(200).render('reviews', {
    title: 'My reviews',
    userAll
  });
})