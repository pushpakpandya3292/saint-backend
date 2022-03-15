const { sendEmailToAdmin, validateEmail, validateNull } = require('../utils');

const postContactUs = async (req, res) => {
    try {
        const { user_email, message } = req.body;

        const isEmailValid = await validateEmail(user_email);
        const isMessageValid = await validateNull(message);

        if (isEmailValid && isMessageValid) {
            sendEmailToAdmin({ user_email, message });
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
