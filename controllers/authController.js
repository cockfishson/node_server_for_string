import { authServices } from "../services/authServices.js";
import { CustomError } from "../helpers/utils/error_handlers/customResponseError.js";

export class AuthController {
  static login(request, response) {
    const { username, password } = request.body;
    try {
      const user = authServices.authenticateUser(username, password);
      response.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof CustomError) {
        response
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else {
        response
          .status(500)
          .json({ success: false, message: "An unexpected error occurred" });
      }
    }
  }
}
