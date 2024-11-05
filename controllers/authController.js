const { authenticateUser } = require("../services/authServices");

exports.login = (request, responce) => {
  const { username, password } = request.body;
  const result = authenticateUser(username, password);

  if (result.success) {
    responce.status(200).json(result);
  } else {
    responce.status(401).json(result);
  }
};
