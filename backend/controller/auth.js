require('dotenv').config();
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const { expressjwt: eJwt } = require('express-jwt');
const bcrypt = require('bcrypt');

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.json({ message: "User does not found" });

    if (!bcrypt.compareSync(password, user.password)) return res.json({ message: "Email and password does not matched" })

    user.is_signedIn = true;

    try {
        await user.save();
    } catch (error) {
        return res.status(500).json(error);
    }

    const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, process.env.secret, { algorithm: "HS256" })

    res.cookie("token", token, new Date() + 1111)

    return res.json({ token });
}

exports.signup = async (req, res) => {
    const {
        firstName: first_name,
        lastName: last_name,
        userName: user_name,
        bio, header: title,
        gender, email, password
    } = req.body;

    const user = await User.build({
        first_name,
        last_name, user_name, bio,
        title, gender, email, password
    });

    try {
        await user.save();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!user) return res.json({ message: "Not able to signup" })

    const token = jwt.sign(
        { id: user.id, is_admin: user.is_admin },
        process.env.secret,
        { algorithm: "HS256" }
    )

    res.cookie("token", token, new Date() + 1111)

    return res.json({ token });
}

exports.signout = async (req, res) => {
    const user = await User.findOne({ where: { id: req.auth.id } });

    if (!user) return res.json({ message: "Not able to signout" })

    user.is_signedIn = false;

    try {
        await user.save();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    res.clearCookie('token');

    return res.json({
        "messege": "User Sign out successfully"
    })
}

exports.isSignedIn = eJwt({
    secret: process.env.secret,
    userProperty: "auth",
    algorithms: ['HS256']
})

exports.isAuthenticated = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.auth.id);
        if (!user) throw new Error("User is not available");
        req.profile = user;
    } catch (error) {
        return res.json({ error: error.message });
    }

    let user = req.profile.is_signedIn;
    if (!user) {
        return res.status(200).json({
            "message": "User is signed out"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.is_admin && req.auth.is_admin) {
        return next();
    }
    return res.status(200).json({
        "message": "Authorization failed"
    })
}