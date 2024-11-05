const { getUsers } = require("../models/userModel");

const authenticateUser = (username, password) => {
  const userFound = getUsers().find(
    (user) => user.username === username && user.password === password
  );
  return userFound
    ? { success: true, message: "Login successful" }
    : { success: false, message: "Invalid username or password" };
};

module.exports = { authenticateUser };
