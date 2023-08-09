const { validationResult, body } = require("express-validator")

exports.validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

exports.signUpValidation = [
    body('firstName').exists({ checkNull: false }).trim(),
    body('lastName').exists({ checkNull: false }).trim(),
    body('email').exists({ checkNull: false }).isEmail().trim(),
    body('userName').exists({ checkNull: false }).trim(),
    body('password').exists({ checkNull: false }).isLength({ min: 8 }),
];

exports.singInValidation = [
    body('email').exists({ checkNull: false }).isEmail().trim(),
    body('password').exists({ checkNull: false })
];

exports.addCompanyValidation = [
    body('companyName').exists({ checkNull: false }).isLength({ min: 1 }).trim(),
    body('aboutCompany').exists({ checkNull: false }).isLength({ min: 10, max: 500 }).trim(),
    body('CEO').exists({ checkNull: false }).isLength({ min: 1, max: 200 }).trim(),
    body('numberOfEmployee').exists({ checkNull: false }).trim().isInt(),
    body('companyAddress').exists({ checkNull: false }).isLength({ min: 10, max: 500 }).trim(),
    body('revenue').exists({ checkNull: false }).isLength({ min: 10, max: 200 }).trim(),
    body('officialWebsite').exists({ checkNull: false }).isLength({ min: 10, max: 500 }).trim().isURL(),
    body('email').exists({ checkNull: false }).isLength({ min: 10, max: 500 }).trim(),
    body('dateOfFoundation').exists({ checkNull: false }).isLength({ min: 10, max: 200 }).trim(),
    body('headquarter').exists({ checkNull: false }).isLength({ min: 10, max: 100 }).trim(),
]

exports.addJobValidation = [
    body('jobDesignation').exists({ checkNull: false }).isLength({ min: 1 }).trim(),
    body('header').exists({ checkNull: false }).isLength({ min: 10, max: 500 }).trim(),
    body('description').exists({ checkNull: false }).isLength({ min: 10, max: 200 }).trim(),
    body('location').exists({ checkNull: false }).trim(),
    body('salaryAndBenefits').exists({ checkNull: false }).isLength({ min: 10, max: 500 }).trim(),
    body('companyInfo').exists({ checkNull: false }).isLength({ min: 10, max: 200 }).trim().isUUID(),
    body('applicationInstruction').exists({ checkNull: false }).isLength({ min: 10, max: 500 }).trim(),
    body('jobType').exists({ checkNull: false }).isLength({ min: 1, max: 500 }).trim(),
    body('experienceLevel').exists({ checkNull: false }).isLength({ min: 1, max: 200 }).trim(),
    body('educationRequirement').exists({ checkNull: false }).isLength({ min: 10, max: 100 }).trim(),
    body('skillsRequirement').exists({ checkNull: false }).isLength({ min: 10, max: 100 }).trim(),
]

exports.applyForJobValidation = [
    // body('resume').exists({ checkNull: false }).isLength({ min: 10, max: 200 }).trim(),
    // body('coverLetter').exists({ checkNull: false }).isLength({ min: 10, max: 500 }).trim(),
    // body('educationAndCertificate').exists({ checkNull: false }).isLength({ min: 10, max: 200 }).trim(),
    body('workExperience').exists({ checkNull: false }).trim(),
    body('skills').exists({ checkNull: false }).isLength({ min: 10, max: 500 }).trim(),
]

exports.changeStatusValidation = [
    body('jobId').exists({ checkNull: false }).trim().isUUID(),
    body('userId').exists({ checkNull: false }).trim().isUUID(),
    body('status').exists({ checkNull: false }).trim().isIn(['Pending', 'Accepted', 'Denied']),
]