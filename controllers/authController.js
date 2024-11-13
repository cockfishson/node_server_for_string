import jwt from "jsonwebtoken";
import { authServices } from "../services/authServices.js";

export class AuthController {
  static login(request, response, next) {
    const { username, password } = request.body;
    authServices
      .authenticateUser(username, password)
      .then((user) => {
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "15m",
        });
        const refreshToken = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET_REFRESH,
          { expiresIn: "7d" }
        );

        response.status(200).json({
          success: true,
          accessToken,
          refreshToken,
        });
      })
      .catch(next);
  }
  // eslint-disable-next-line no-unused-vars
  static refreshToken(request, response, next) {
    const { refreshToken } = request.body;
    if (!refreshToken) {
      return response
        .status(401)
        .json({ message: "Refresh Token is required" });
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
      if (err) {
        return response.status(403).json({ message: "Invalid refresh token" });
      }
      const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });
      response.status(200).json({ accessToken });
    });
  }
}
