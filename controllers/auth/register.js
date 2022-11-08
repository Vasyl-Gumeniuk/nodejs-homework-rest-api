const { User } = require('../../models/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { RequestError, sendEmail } = require('../../helpers');
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError (409, 'Email in use')
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({ name, email, password: hashPassword, avatarUrl, verificationToken });
    
    const mail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify</a>`
    };

    sendEmail(mail);
    
    res.status(201).json({
        name: result.name,
        email: result.email,
    })
};


module.exports = register;