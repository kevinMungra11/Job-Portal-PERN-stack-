const { User, Job_Info, Job_Application } = require('../models/index');
const cloudinary = require('cloudinary').v2;
const http = require('http');

exports.getUser = (req, res) => {
    try {
        const { first_name, last_name, user_name } = req.profile
        return res.json({ firstName: first_name, lastName: last_name, userName: user_name });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (!users) return res.status(400).json({ message: "Not found users in DB!" });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getAllUsersWithJobDetail = async (req, res) => {
    try {
        let { page, size } = req.query;
        page = page ? parseInt(page) : 0;
        size = size ? parseInt(size) : 8;

        const usersWithJobDetails = await User.findAndCountAll({
            where: {
                is_admin: false
            },
            include:
            {
                model: Job_Info,
                through: {
                    attributes:
                    {
                        exclude: ['user_id', 'job_id', 'updated_at', 'created_at']
                    }
                },
                attributes:
                {
                    exclude: ['admin_id', 'updated_at', 'created_at']
                },
                required: false
            },
            attributes:
            {
                exclude: ['admin_id', 'is_admin',
                    'is_signedIn', 'updated_at', 'created_at', 'password']
            },
            offset: page * size,
            limit: size
        });
        if (!usersWithJobDetails) return res.json({ message: "No users available" });

        usersWithJobDetails.totalPages = Math.ceil(usersWithJobDetails.count / size);
        usersWithJobDetails.currentPage = page;

        return res.json(usersWithJobDetails);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getOneUserWithJobDetail = async (req, res) => {
    try {
        const user = await User.findOne(
            {
                where: {
                    id: req.profile.id
                },
                include:
                {
                    model: Job_Info,
                    through: {
                        attributes:
                        {
                            exclude: ['user_id', 'job_id', 'updated_at', 'created_at']
                        }
                    },
                    attributes:
                    {
                        exclude: ['admin_id', 'updated_at', 'created_at']
                    },
                    required: false
                },
                attributes:
                {
                    exclude: ['id', 'admin_id', 'is_admin', 'is_signedIn',
                        'updated_at', 'created_at']
                }
            })
        if (!user) return res.status(400).json({ message: "No User is available" });
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getResume = async (req, res) => {
    return template(req, res, "Resumes", req.params.id);
}

exports.getCoverLetter = async (req, res) => {
    return template(req, res, "Cover_Letter", req.params.id);
}

exports.getCerficate = async (req, res) => {
    return template(req, res, "Education_Certificates", req.params.id);
}

function template(req, res, folderName, id) {
    cloudinary.config({
        cloud_name: "doewmzmfo",
        api_key: "285288857298592",
        api_secret: "0LdmlM6V6-Hcvqup4vtfNBKRIBg"
    });

    cloudinary.api.resource(`Kevin/${folderName}/${id}`, (error, result) => {

        if (error) {
            console.error(error);
            return res.status(500).send({ err: error.message });
        }

        http.get(result.url, pdf => {
            const chunks = [];
            pdf.on('data', chunk => {
                chunks.push(chunk);
            });

            pdf.on('end', () => {
                const imageData = Buffer.concat(chunks);
                res.set('Content-Type', 'application/pdf');
                return res.send(imageData);
            });
        }).on('error', error => {
            console.error(error);
            res.status(500).send('Error fetching image');
        });
    });
}