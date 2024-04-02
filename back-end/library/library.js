const success_res = (msg, data) => {
  return {
    flag: 1,
    message: msg,
    data: data ? data : {},
  };
};

const error_res = (msg, data) => {
  return {
    flag: 0,
    message: msg,
    data: data ? data : {},
  };
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
  return emailRegex.test(email);
};

const validateMobileNumber = (number) => {
  const mobileNumberRegex = /^\d{6,10}$/;
  return mobileNumberRegex.test(number);
};

module.exports = {
  success_res,
  error_res,
  validateEmail,
  validateMobileNumber,
};
