const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controller/auth');
const { addJob, getJobById, getJob, getAllJobs, applyForJob, changeStatus, search, filterJobsByLocation, filterRecentJobs, deleteJob } = require('../controller/job');
const { param } = require('express-validator');
const { addJobValidation, applyForJobValidation, validate, changeStatusValidation } = require('../controller/middleware');
const router = express.Router();

router.param('jobId', getJobById);

// Get all available jobs
router.get('/all', getAllJobs);

// Admin can add jobs
router.post('/add', addJobValidation, validate, isSignedIn, isAuthenticated, isAdmin, addJob);

// Search for job
router.get('/search', search);

// Get job by location
router.get('/location', filterJobsByLocation);

// Get recent jobs
router.get('/recent', filterRecentJobs);

// Get job by id
router.get('/:jobId', [param('jobId').isUUID()], isSignedIn, isAuthenticated, getJob);

// Accept or Reject request
router.put('/update-status', [param('jobId').isUUID()], changeStatusValidation, validate, isSignedIn, isAuthenticated, isAdmin, changeStatus);

// Apply for job
router.post('/:jobId/apply', [param('jobId').isUUID()], applyForJobValidation, validate, isSignedIn, isAuthenticated, applyForJob);

// Delete job
router.delete('/:jobId/delete', [param('jobId').isUUID()], isSignedIn, isAuthenticated, isAdmin, deleteJob);
module.exports = router;