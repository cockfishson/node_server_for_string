import { users } from "../models/userModel.js";
import { CustomError } from "../helpers/error_handlers/customResponseError.js";
import { HttpStatus } from "../helpers/error_handlers/responseErrorCodes.js";

export class authServices {
  static authenticateUser = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password,
    );
    if (!user) {
      throw new CustomError(
        HttpStatus.UNAUTHORIZED,
        "Invalid username or password",
      );
    }
    return user;
  };
}
