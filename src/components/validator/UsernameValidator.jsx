const VALID_USERNAME = /^[0-9A-Za-z]{6,16}$/;

const isValidUsername = (username) => {
  return VALID_USERNAME.test(username);
};

export default isValidUsername;
