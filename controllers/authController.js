import { authServices } from "../services/authServices.js";
import { asyncMiddleware } from "../middlewares/asyncMiddleware.js";
import { CustomError } from "../helpers/error_handlers/customResponseError.js";
import { HttpStatus } from "../helpers/error_handlers/responseErrorCodes.js";
import { JwtService } from "../services/jwtServices.js";

export class AuthController {
  // eslint-disable-next-line no-unused-vars
  static login = asyncMiddleware(async (req, res, next) => {
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
  });
  static refreshToken = asyncMiddleware(async (req, res) => {
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
  });
}
