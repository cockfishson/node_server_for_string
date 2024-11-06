const { getUsers } = require("../models/userModel");

const authenticateUser = (username, password) => {
  return getUsers().find(
    (user) => user.username === username && user.password === password
  )
    ? { success: true, message: "Login successful" }
    : { success: false, message: "Invalid username or password" };
};

module.exports = { authenticateUser };
