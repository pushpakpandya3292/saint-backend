
const express = require('express')
const router = express.Router();

const adminController = require("../controller/admin.controller");

const authMiddleware = require('../middleware/authMiddleware');

router.post("/login", adminController.login);
router.post("/create_job", authMiddleware, adminController.create_job);
router.get("/get_all_jobs", authMiddleware, adminController.get_all_jobs);
router.get("/get_single_job", authMiddleware, adminController.get_single_job);


module.exports = router;