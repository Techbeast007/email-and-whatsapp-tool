const express = require("express");
const { sendEmail } = require("../controllers/emailController");
const { validateRequest } = require("../middlewares/validateRequest");

const router = express.Router();

router.post("/sendemail", validateRequest, sendEmail);

module.exports = router;