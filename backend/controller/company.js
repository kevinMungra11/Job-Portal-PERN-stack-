const { Company_Details } = require('../models/index');
const { Sequelize: sequelize } = require('sequelize');

exports.getCompanyById = async (req, res, next, id) => {
    try {
        const company = await Company_Details.findByPk(id);
        if (!company) throw new Error("Not found any company");
        req.company = company;
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.addCompany = async (req, res) => {
    const { companyName: company_name,
        aboutCompany: about_company,
        CEO: ceo,
        numberOfEmployee: number_of_emplyees,
        companyAddress: company_address,
        revenue,
        headquarter,
        officialWebsite: official_website,
        email,
        dateOfFoundation: date_of_foundation } = req.body;

    try {
        const company = await Company_Details.build({
            company_name,
            about_company,
            ceo,
            number_of_emplyees,
            company_address,
            revenue,
            headquarter,
            official_website,
            email,
            date_of_foundation
        });
        if (!company) throw new Error("Not able to save in DB!");
        company.admin_id = req.profile.id;
        await company.save();
        return res.json(company);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getAllCompanies = async (req, res) => {
    try {
        let { page, size } = req.query;
        page = page ? parseInt(page) : 0;
        size = size ? parseInt(size) : 8;

        const companies = await Company_Details.findAndCountAll({
            where: {
                admin_id: req.profile.id
            },
            attributes: {
                exclude: ['admin_id', 'created_at', 'updated_at']
            },
            offset: page * size,
            limit: size
        });
        if (!companies) throw new Error("No companies available in DB!");

        companies.totalPage = Math.ceil(companies.count / size);
        companies.currentPage = size;

        return res.json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getCompany = (req, res) => {
    const { company_name: companyName,
        about_company: aboutCompany,
        ceo: CEO,
        number_of_emplyees: numberOfEmployee,
        company_address: companyAddress,
        revenue,
        headquarter,
        official_website: officialWebsite,
        email,
        date_of_foundation: dateOfFoundation } = req.company;
    return res.json({
        companyName,
        aboutCompany,
        CEO,
        numberOfEmployee,
        companyAddress,
        revenue,
        headquarter,
        officialWebsite,
        email,
        dateOfFoundation
    });
}

exports.search = async (req, res) => {
    let { search, page, size } = req.query;

    page = page ? parseInt(page) : 0;
    size = size ? parseInt(size) : 8;

    try {
        const searchResult = await Company_Details.findAndCountAll({
            where: {
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("company_name")),
                    "LIKE",
                    `%${search.toLowerCase()}%`),
            },
            offset: page * size,
            limit: size
        }
        );

        if (!searchResult) throw new Error("No result");

        searchResult.totalPages = Math.ceil(searchResult.count / size);
        searchResult.currentPage = size;

        return res.json(searchResult);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getAll = async (req, res) => {
    try {
        const companies = await Company_Details.findAll({
            where: {
                admin_id: req.profile.id
            },
            attributes: {
                exclude: ['admin_id', 'created_at', 'updated_at']
            }
        })
        if (!companies) throw new Error("No result");
        return res.json(companies);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}