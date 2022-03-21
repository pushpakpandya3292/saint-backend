const nodemailer = require('nodemailer');
const env = require("./environment");

const sendEmailToAdmin = async (data) => {
    console.log("data---->", data);
    const { user_email, message, user_name } = data;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SYSTEM_EMAIL_ID,
            pass: process.env.SYSTEM_EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SYSTEM_EMAIL_ID,
        to: process.env.ADMIN_EMAIL_ID,
        subject: `Contact us mail from ${user_name}`,
        html: `<div style='width: 100%;box-sizing: border-box;border: 1px solid #dddddd'>
        <div style='text-align:center;background-color: #7E5AF6;padding: 15px;line-height: 0;'>
            <img src="https://i.ibb.co/4SpZwm0/logo.png" alt="Logo" style="max-width: 100%;width: 150px;">
        </div>
        <div style="padding: 25px 20px;">
            <ul style="padding: 0;margin: 0;list-style: none;">
                <li style="margin-bottom: 15px">
                    <p style="margin: 0;font-size: 15px;"><b style="color: #7e5af6;">Email: </b>${user_email}</p>
                </li>
                <li style="margin-bottom: 15px">
                    <p style="margin: 0;font-size: 15px;"><b style="color: #7e5af6;">Name: </b>${user_name}</p>
                </li>
                <li>
                    <p style="margin: 0;font-size: 15px;"><b style="color: #7e5af6;">Message: </b>${message}</p>
                </li>
            </ul>
        </div>
    </div>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('error --> ', error)
            throw Error("Errow while sending email");
        } else {
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