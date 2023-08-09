const express = require('express');
const router = express.Router();
const { isSignedIn, isAdmin, isAuthenticated } = require('../controller/auth');
const { getUser, getAllUsers, getAllUsersWithJobDetail, getOneUserWithJobDetail, getResume, getCoverLetter, getCerficate } = require('../controller/user');

// Get all users
router.get('/all', getAllUsers);

// Get user with id
router.get('/', isSignedIn, isAuthenticated, isAdmin, getUser);

// Get all users with their respective job details
router.get('/all/jobs', isSignedIn, isAuthenticated, isAdmin, getAllUsersWithJobDetail);

// Get particular user with his applied job details
router.get('/job', isSignedIn, isAuthenticated, getOneUserWithJobDetail);

// Get resume
router.get('/resume/:id', getResume);
// router.get('/resume/:id', getResume)

// Get cover_letter
router.get('/cover-letter/:id', getCoverLetter);

// Get educatinal_certificates
router.get('/certificate/:id', getCerficate);

module.exports = router;