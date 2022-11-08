const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "vasly.stone@meta.ua",
        pass: META_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
    
    const mail = { ...data, from: "vasly.stone@meta.ua" };

    transport.sendMail(mail)
        .then(() => console.log("Email send success"))
        .catch(error => console.log(error.message))
};



module.exports = sendEmail;