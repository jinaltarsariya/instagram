const express = require("express");
const {
  postUserSignup,
  postUserLogin,
} = require("../controller/user.controller");
const router = express.Router();

router.post("/instagram/user/signup", postUserSignup);
router.post("/instagram/user/login", postUserLogin);

module.exports = router;
