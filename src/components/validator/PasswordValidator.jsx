const PASSWORD_PATTERN = /^(?=.*?[0-9])(?!.* )(?=.*?[A-Za-z]).{8,32}$/;
// const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,32}$/;

const isValidPassword = (password) => {
  return PASSWORD_PATTERN.test(password);
};

export default isValidPassword;
