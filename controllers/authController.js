import { authServices } from "../services/authServices.js";
import { CustomError } from "../helpers/utils/error_handlers/customResponseError.js";

export class AuthController {
  static login(request, response, next) {
    const { username, password } = request.body;
    try {
      const user = authServices.authenticateUser(username, password);
      response.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
