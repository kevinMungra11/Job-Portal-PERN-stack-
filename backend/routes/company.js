const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controller/auth');
const { addCompany, getAllCompanies, getCompany, getCompanyById, search, getAll } = require('../controller/company');
const { addCompanyValidation, validate } = require('../controller/middleware');
const { param } = require('express-validator');
const { route } = require('./job');
const router = express.Router();

router.param('companyId', getCompanyById);

// Get all company added by admin
router.get('/all', isSignedIn, isAuthenticated, isAdmin, getAllCompanies);

// Add company
router.post('/add',
    addCompanyValidation,
    validate,
    isSignedIn, isAuthenticated, isAdmin,
    addCompany
);

// search company
router.get('/search', isSignedIn, isAuthenticated, isAdmin, search);

// Get company by id
router.get('/:companyId',
    [param('companyId').isUUID()],
    isSignedIn, isAuthenticated, isAdmin,
    getCompany
);

// get all company (for dropdown)
router.get('/get/all', isSignedIn, isAuthenticated, isAdmin, getAll);

module.exports = router;