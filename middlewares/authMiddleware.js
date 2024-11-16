import jwt from "jsonwebtoken";
import { CustomError } from "../helpers/error_handlers/customResponseError.js";
import { HttpStatus } from "../helpers/error_handlers/responseErrorCodes.js";
export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new CustomError(HttpStatus.UNAUTHORIZED, "Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        throw new CustomError(HttpStatus.UNAUTHORIZED, "Token expired");
      }
      throw new CustomError(HttpStatus.FORBIDDEN, "Forbidden");
    }
    req.user = user;
    next();
  });
};
