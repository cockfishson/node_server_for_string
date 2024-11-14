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
        "Invalid username or password"
      );
    }

    const accessToken = JwtService.sign(
      { id: user.id },
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = JwtService.signRefresh(
      { id: user.id },
      {
        expiresIn: "7d",
      }
    );

    return { user, accessToken, refreshToken };
  };

  static generateAccessToken = (userId) => {
    return JwtService.sign(
      { id: userId },
      {
        expiresIn: "15m",
      }
    );
  };

  static signupUser = async (
    username,
    password,
    confirmPassword,
    name,
    surname,
    age
  ) => {
    if (
      !username ||
      !password ||
      !confirmPassword ||
      !name ||
      !surname ||
      !age
    ) {
      throw new CustomError(HttpStatus.BAD_REQUEST, "All fields are required");
    }
    if (
      await User.findOne({
        where: {
          username: username.toString(),
        },
      })
    ) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        "User with this username already exists"
      );
    }

    if (username.length < 3) {
      throw new CustomError(HttpStatus.BAD_REQUEST, "Username too short");
    }

    if (password !== confirmPassword) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        "Password and confirm password do not match"
      );
    }

    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[`!@#$%^&*()_\-+={}[\];':"|,.<>/?~]/.test(password);

    if (!hasNumber || !hasSpecialChar || password.length < 4) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        "Password must contain at least one number and one special character and be > 3 symbols"
      );
    }

    if (password != confirmPassword) {
      throw new CustomError(HttpStatus.BAD_REQUEST, "Passwords do not match");
    }

    if (name < 3) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        "Name should be 3 symbols or more"
      );
    }

    if (surname < 3) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        "Surname should be 3 symbols or more"
      );
    }

    if (!/[0-9]/.test(age) || parseInt(age) < 1) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        "Age should be a number that is greater then 0"
      );
    }

    const newUser = await User.create({
      username: username.toString(),
      password: password.toString(),
      first_name: name.toString(),
      last_name: surname.toString(),
      age: age.toString(),
    });

    return newUser;
  };
}
