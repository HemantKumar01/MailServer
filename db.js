function isEmailExisting() {
  return true;
}

function storeToken(email, token) {
  console.log(email, token);
}
function setPassword(token, password) {
  console.log(token);
  console.log(password);
}

module.exports = {
  isEmailExisting: isEmailExisting,
  storeToken: storeToken,
  setPassword: setPassword,
};
