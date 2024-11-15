import User from "../models/userModel.js";
import { CustomError } from "../helpers/error_handlers/customResponseError.js";
import { HttpStatus } from "../helpers/error_handlers/responseErrorCodes.js";
import { JwtService } from "./jwtServices.js";
import bcrypt from "bcrypt";

export class authServices {
  static authenticateUser = async (username, password) => {
    const user = await User.findOne({
      where: {
        username: username.toString(),
      },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
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

  static signupUser = async ({ username, password, name, surname, age }) => {
    if (await User.findOne({ where: { username: username } })) {
      throw new CustomError(HttpStatus.BAD_REQUEST, {
        username: "User with this username already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username.toString(),
      password: hashedPassword,
      first_name: name.toString(),
      last_name: surname.toString(),
      age: age.toString(),
    });
    return newUser;
  };
}
