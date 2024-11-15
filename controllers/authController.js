import { authServices } from "../services/authServices.js";
import { CustomError } from "../helpers/error_handlers/customResponseError.js";
import { HttpStatus } from "../helpers/error_handlers/responseErrorCodes.js";
import { JwtService } from "../services/jwtServices.js";

export class AuthController {
  static login = async (req, res) => {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await authServices.authenticateUser(
      username,
      password,
    );

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
    });
  };
  static refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new CustomError(
        HttpStatus.UNAUTHORIZED,
        "Refresh Token is required",
      );
    }
    const decoded = JwtService.verifyRefresh(refreshToken);
    const accessToken = authServices.generateAccessToken(decoded.id);
    res.status(200).json({ accessToken });
  };

  static signup = async (req, res) => {
    const {
      username,
      password,
      confirmPassword,
      firstName: name,
      lastName: surname,
      age,
    } = req.body;

    await authServices.signupUser({
      username,
      password,
      confirmPassword,
      name,
      surname,
      age,
    });
    res.status(200).json({ success: true });
  };
}
