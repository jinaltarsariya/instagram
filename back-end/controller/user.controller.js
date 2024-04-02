const {
  error_res,
  validateEmail,
  validateMobileNumber,
  success_res,
} = require("../library/library");
const userModel = require("../model/user.model");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

const postUserSignup = async (req, res) => {
  try {
    let { fullName, username, email, mobileNumber, password, confirmPassword } =
      req.body;

    if (
      !fullName ||
      !username ||
      !email ||
      !mobileNumber ||
      !password ||
      !confirmPassword
    ) {
      return res.json(error_res("Please provide all fields !"));
    }

    if (fullName.length < 3) {
      return res.json(
        error_res("Full Name must be at least 3 characters long.")
      );
    }

    if (fullName.length > 50) {
      return res.json(
        error_res(
          "The Full Name you provided is too long. Please enter a Full Name that is 50 characters or fewer in length."
        )
      );
    }

    if (username.length < 3) {
      return res.json(
        error_res("Username must be at least 3 characters long.")
      );
    }

    if (username.length > 30) {
      return res.json(
        error_res(
          "The Username you provided is too long. Please enter a username that is 30 characters or fewer in length."
        )
      );
    }

    if (!validateEmail(email)) {
      return res.json(
        error_res("Email is invalid. Please enter a valid email address.")
      );
    }

    if (!validateMobileNumber(mobileNumber)) {
      return res.json(
        error_res(
          "Mobile number is invalid. Please enter a valid mobile number with 6 to 10 digits."
        )
      );
    }

    if (password.length < 3) {
      return res.json(
        error_res("Password must be at least 3 characters long.")
      );
    }

    if (password.length > 15) {
      return res.json(
        error_res(
          "The password you provided is too long. Please enter a password that is 15 characters or fewer in length."
        )
      );
    }

    if (password !== confirmPassword) {
      return res.json(error_res("Password and Confirm Password must match."));
    }

    req.body.password = await bcrypt.hash(password, 10);

    let checkUsername = await userModel.findOne({ username: username });
    if (checkUsername) {
      return res.json(error_res("This username is already registered."));
    }

    let createUser = await userModel.create(req.body);

    return res.json(success_res("User created successfully.", createUser));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

const postUserLogin = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.json(error_res("Please provide all fields !"));
    }

    let checkValidUser = await userModel.findOne({
      $or: [
        { username: username },
        { email: username },
        { mobileNumber: username },
      ],
    });

    if (!checkValidUser) {
      return res.json(error_res("User not found."));
    }

    let checkValidPassword = await bcrypt.compare(
      password,
      checkValidUser.password
    );

    if (!checkValidPassword) {
      return res.json(error_res("Your password is incorrect."));
    }

    let generateToken = await jwt.sign(
      { id: checkValidUser._id },
      "USER-AUTHENTICATION"
    );

    return res.json(success_res("User login successfully.", generateToken));
  } catch (error) {
    return res.json(error_res(error.message));
  }
};

module.exports = { postUserSignup, postUserLogin };
