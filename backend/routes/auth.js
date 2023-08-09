const express = require('express');
const router = express.Router();
const { signin, signup, signout, isSignedIn, isAuthenticated, isAdmin, uploadProfilePic } = require('../controller/auth');
const { validate, signUpValidation, singInValidation } = require('../controller/middleware');

router.get('/signout', isSignedIn, signout);

router.post('/signin', singInValidation, validate, signin);

router.post('/signup', signUpValidation, validate, signup);

module.exports = router;