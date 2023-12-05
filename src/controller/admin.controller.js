const jwt = require('jsonwebtoken');
const db = require("../models");
const { errorResponseHelper, successResponseHelper } = require('../helper/responseHelper');
const user = db.users;
const jobs = db.jobs;
const job_categories = db.job_categories;

const login = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return errorResponseHelper(res, 401, "Please enter password.");
    }
    const data = await user.findOne({ where: { password: password } });

    if (!data) {
      return errorResponseHelper(res, 400, 'Incorrect Password!')
    }

    if (!process.env.SECRET_KEY) {
      return errorResponseHelper(res, 401, 'Token secret not configured')
    }

    const userData = JSON.parse(JSON.stringify(data))
    userData.accessToken = jwt.sign({ userId: data.id, password }, process.env.SECRET_KEY);
    delete userData.password, delete userData.user_id, delete userData.email
    return successResponseHelper(res, 200, 'Loggedin Successfully!', userData)

  } catch (error) {
    return errorResponseHelper(res, 500, error.message)
  }
};
const create_job = async (req, res) => {
  try {
    const jobBodyData = JSON.parse(JSON.stringify(req.body));
    const errorMessages = [];

    if (!jobBodyData.job_title) {
      errorMessages.push("Please enter the job title.");
    }
    if (!jobBodyData.job_category_id) {
      errorMessages.push("Please select the job category.");
    }

    if (errorMessages.length > 0) {
      return errorResponseHelper(res, 401, errorMessages.join(", "));
    }

    const job_data = await jobs.create({
      ...jobBodyData
    });
    return successResponseHelper(res, 200, "Job data added successfully.", job_data);
  } catch (error) {
    return errorResponseHelper(res, 500, error.message)
  }
};
const get_all_jobs = async (req, res) => {
  try {
    let job_data = await jobs.findAll({
      attributes: ['job_id', "job_title", "job_vision", "job_about", "job_responsibility", "job_looking_for", "job_pay_benifits", "job_interview_process", "job_category_id", [db.sequelize.literal('`job_category`.`name`'), 'job_category_name']],
      include: [{
        model: job_categories,
        attributes: []
      }]
    });
    return successResponseHelper(res, 200, "Job data fetched successfully.", job_data);
  } catch (error) {
    return errorResponseHelper(res, 500, error.message)
  }
};
const get_single_job = async (req, res) => {
  try {
    const { job_id } = req.query;
    if (!job_id) {
      return errorResponseHelper(res, 401, "Please provide job id");
    }
    let job_data = await jobs.findOne({
      where: { job_id: job_id },
      attributes: ['job_id', "job_title", "job_vision", "job_about", "job_responsibility", "job_looking_for", "job_pay_benifits", "job_interview_process", "job_category_id", [db.sequelize.literal('`job_category`.`name`'), 'job_category_name']],
      include: [{
        model: job_categories,
        attributes: []
      }]
    });
    return successResponseHelper(res, 200, "Job data fetched successfully.", job_data);
  } catch (error) {
    return errorResponseHelper(res, 500, error.message)
  }
};


module.exports = {
  login,
  create_job,
  get_all_jobs,
  get_single_job
};