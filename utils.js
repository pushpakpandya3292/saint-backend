const nodemailer = require('nodemailer');
const env = require("./environment");

const sendEmailToAdmin = async (data) => {

    const { name, message } = data;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.SYSTEM_EMAIL_ID,
            pass: env.SYSTEM_EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: env.SYSTEM_EMAIL_ID,
        to: env.ADMIN_EMAIL_ID,
        subject: "Contact us mail from " + name,
        text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('error --> ', error)
            throw Error("Errow while sending email");
        }else{
            console.log('info ---> ', info)
        }
    });
};

const validateEmail = async (data) => {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data))) {
        return false;
    }
    return true;
}

const validateNull = async (data) => {
    if (data === "" || data === null || data === undefined) {
        return false;
    }
    return true;
}

module.exports = {
    sendEmailToAdmin,
    validateEmail,
    validateNull,
}