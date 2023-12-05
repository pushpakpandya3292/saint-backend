const successResponseHelper = (res, statusCode, message, data, totalCount) => {
    if (!data) {
        return res.status(statusCode).json({ message });
    } else {
        if (totalCount) {
            return res.status(statusCode).json({ message, success: true, data, totalCount });
        } else {
            return res.status(statusCode).json({ message, success: true, data });
        }
    }
};

const errorResponseHelper = (res, statusCode, errorMessage) => {
    return res.status(statusCode).json({
        success: false,
        message: errorMessage,
    });
}

module.exports = { successResponseHelper, errorResponseHelper };