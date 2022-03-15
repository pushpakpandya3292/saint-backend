require('dotenv').config();

const env = {
    PORT: process.env.PORT || 5000,
    ADMIN_EMAIL_ID: process.env.ADMIN_EMAIL_ID || "",
    SYSTEM_EMAIL_ID: process.env.SYSTEM_EMAIL_ID || "",
    SYSTEM_EMAIL_PASSWORD: process.env.SYSTEM_EMAIL_PASSWORD || "",
}

module.exports = env;