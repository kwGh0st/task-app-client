const EMAIL_PATTERN =
  /^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

const isValidEmail = (email) => {
  return EMAIL_PATTERN.test(email);
};

export default isValidEmail;
