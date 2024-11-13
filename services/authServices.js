import User from "../models/userModel.js";
import { CustomError } from "../helpers/error_handlers/customResponseError.js";
import { HttpStatus } from "../helpers/error_handlers/responseErrorCodes.js";

export class authServices {
  static authenticateUser = async (username, password) => {
    const user = await User.findOne({
      where: {
        username: username.toString(),
        password: password.toString(),
      },
    });
    if (!user) {
      throw new CustomError(
        HttpStatus.UNAUTHORIZED,
        "Invalid username or password"
      );
    }
    return user;
  };
}
