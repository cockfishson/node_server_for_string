import User from "../models/userModel.js";
import { CustomError } from "../helpers/error_handlers/customResponseError.js";
import { HttpStatus } from "../helpers/error_handlers/responseErrorCodes.js";
import { JwtService } from "./jwtServices.js";

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
        "Invalid username or password",
      );
    }

    const accessToken = JwtService.sign(
      { id: user.id },
      {
        expiresIn: "15m",
      },
    );
    const refreshToken = JwtService.signRefresh(
      { id: user.id },
      {
        expiresIn: "7d",
      },
    );

    return { user, accessToken, refreshToken };
  };

  static generateAccessToken = (userId) => {
    return JwtService.sign(
      { id: userId },
      {
        expiresIn: "15m",
      },
    );
  };
}
