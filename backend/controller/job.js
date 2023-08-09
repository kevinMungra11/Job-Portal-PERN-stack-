const { Job_Info, Company_Details, Job_Application } = require('../models/index');
const { Sequelize: sequelize, Op } = require('sequelize');
const cloudinary = require('cloudinary').v2;

exports.getJobById = async (req, res, next, id) => {
    try {
        const job = await Job_Info.findOne({ where: { id }, include: Company_Details })
        if (!job) throw new Error("Job is not available");
        req.job = job;
        next();
    } catch (error) {
        return res.json({ error: error.message })
    }
}

exports.addJob = async (req, res) => {
    const {
        jobDesignation: job_designation,
        header: title,
        description,
        location,
        salaryAndBenefits: salary_and_benefits,
        companyInfo: company_info,
        applicationInstruction: application_instruction,
        jobType: job_type,
        experienceLevel: experience_level,
        educationRequirement: educational_requirement,
        skillsRequirement: skills_requirement
    } = req.body;

    try {
        const job = await Job_Info.build({
            job_designation,
            title,
            description,
            location,
            salary_and_benefits,
            company_info,
            application_instruction,
            job_type,
            experience_level,
            educational_requirement,
            skills_requirement
        });
        job.admin_id = req.profile.id;
        await job.save();
        if (!job) return res.status(500).json({ message: "Not able to save in db" });
        return res.json(job);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getJob = (req, res) => {
    return res.json(req.job)
}

exports.getAllJobs = async (req, res) => {
    try {
        let { page, size } = req.query;
        page = page ? parseInt(page) : 0;
        size = size ? parseInt(size) : 8;
        const jobs = await Job_Info.findAndCountAll({
            include: {
                model: Company_Details,
                attributes: {
                    exclude: ['admin_id', 'id',
                        'created_at', 'updated_at', 'company_info'
                    ]
                }
            },
            attributes: {
                exclude: ['admin_id', 'created_at', 'updated_at']
            },
            offset: page * size,
            limit: size
        });
        if (!jobs) return res.status(500).json({ message: "No jobs are available" });

        jobs.totalPages = Math.ceil(jobs.count / size);
        jobs.currentPage = page;

        return res.json(jobs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.applyForJob = async (req, res) => {
    console.log(req.file);
    const {
        workExperience: work_experience,
        skills
    } = req.body;

    cloudinary.config({
        cloud_name: "doewmzmfo",
        api_key: "285288857298592",
        api_secret: "0LdmlM6V6-Hcvqup4vtfNBKRIBg"
    });

    try {
        let file1 = req.files.resume;
        await cloudinary.uploader.upload(file1.tempFilePath, {
            folder: 'Kevin/Resumes',
            public_id: req.profile.id + req.params.jobId,
            resource_type: 'auto'
        });

        let file2 = req.files.coverLetter;
        await cloudinary.uploader.upload(file2.tempFilePath, {
            folder: 'Kevin/Cover_Letter/',
            public_id: req.profile.id + req.params.jobId,
            resource_type: 'auto'
        });

        let file3 = req.files.experienceLetter;
        await cloudinary.uploader.upload(file3.tempFilePath, {
            folder: 'Kevin/Education_Certificates/',
            public_id: req.profile.id + req.params.jobId,
            resource_type: 'auto'
        });
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ error: error.message })
    }

    try {
        const jobApplication = await Job_Application.build({ work_experience, skills })
        if (!jobApplication) return res.status(500).json({ message: "something went wrong" })
        jobApplication.user_id = req.profile.id;
        jobApplication.job_id = req.job.id;
        await jobApplication.save();
        return res.json(jobApplication);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.changeStatus = async (req, res) => {
    const { userId, jobId, status } = req.body;
    try {
        const job = await Job_Application.findOne({
            where: {
                user_id: userId, job_id: jobId
            }
        });
        job.status = status;
        if (!job) return res.json({ error: "not able to change status" });
        await job.save();
        return res.json(job);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.search = async (req, res) => {
    let { search, page, size } = req.query;

    page = page ? parseInt(page) : 0;
    size = size ? parseInt(size) : 12;

    try {
        const searchResult = await Job_Info.findAndCountAll({
            where: {
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("description")),
                    "LIKE",
                    `%${search.toLowerCase()}%`),
            },
            offset: page * size,
            limit: size
        }
        );

        if (!searchResult) throw new Error("No result");
        searchResult.totalPages = Math.ceil(searchResult.count / size);
        return res.json(searchResult)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.filterJobsByLocation = async (req, res) => {
    const { location, page, size } = req.query;
    page = page ? parseInt(page) : 0;
    size = size ? parseInt(size) : 9;
    try {
        const jobs = await Job_Info.findAll({
            where: { location: location },
            offset: page * size,
            limit: size
        });
        if (!jobs) throw new Error("No jobs are available");
        return res.json(jobs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.filterRecentJobs = async (req, res) => {
    let { sortby, page, size } = req.body;
    page = page ? parseInt(page) : 0;
    size = size ? parseInt(size) : 9;

    if (sortby) {
        try {
            const jobs = Job_Info.findAll({
                include: {
                    model: Company_Details,
                    attributes: { exclude: ['admin_id', 'id'] }
                },
                attributes: {
                    exclude: ['admin_id', 'id']
                },
                offset: page * size,
                limit: size,
                order: [['date', sortby]]
            })
            if (!jobs) throw new Error("No jobs found");
            return res.json(jobs);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(500).json("Query params are not there");
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job_Info.findByPk(req.params.jobId);
        if (!job) throw new Error("Job not found");
        await job.destroy();
        return res.json('Job deleted successfully');
    } catch (error) {
        return res.status(400).json({ error: error.messages });
    }
}