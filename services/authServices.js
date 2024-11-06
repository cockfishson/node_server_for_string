import { users } from "../models/userModel.js";

export const authenticateUser = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password
  )
    ? { success: true, message: "Login successful" }
    : { success: false, message: "Invalid username or password" };
};
