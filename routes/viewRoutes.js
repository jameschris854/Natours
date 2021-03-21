const express = require('express')
const viewsController = require('./../controllers/viewsController')
const authController = require('./../controllers/authController')
const router = express.Router()
router.use(authController.isLoggedIn)

router.get('/signup',viewsController.getSignupForm)

router.get('/login',viewsController.getloginForm)

router.get('/',viewsController.getOverview)

router.get('/tour/:slug',viewsController.getTour)

router.get('/:id',viewsController.getAccount)

router.get('/:id/myReviews',viewsController.getAccountReviews)

module.exports = router;
