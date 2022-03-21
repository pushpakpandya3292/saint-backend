const { sendEmailToAdmin, validateEmail, validateNull } = require('../utils');

const postContactUs = async (req, res) => {
    console.log("Hii");
    try {
        const { user_email, message, user_name } = req.body;

        const isEmailValid = await validateEmail(user_email);
        const isMessageValid = await validateNull(message);
        const isNameValid = await validateNull(user_name);
        if (isEmailValid && isMessageValid && isNameValid) {
            sendEmailToAdmin({ user_email, message, user_name });
            return res.status(200).send({ status: true });;
        }
        return res.status(400).send({ message: "Invalid data" });
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
};

module.exports = {
    postContactUs,
};
