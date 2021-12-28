const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
  let errors = {};

  // check email field
  if (isEmpty(data.email)) {
    errors.email = "Email field can not be empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid, please provide a valid email";
  }

  // check password field
  const passwordMinChars = 6;
  const passwordMaxChars = 150;
  if (isEmpty(data.password)) {
    errors.password = "Password field can not be empty";
  } else if (
    !Validator.isLength(data.password, {
      min: passwordMinChars,
      max: passwordMaxChars,
    })
  ) {
    errors.password = `Password must be between ${passwordMinChars} and ${passwordMaxChars} characters long`;
  }

  // check confirm password field
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password and Confirm Password fields must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
