import { authServices } from "../services/authServices.js";

export class AuthController {
  static login(request, response) {
    const { username, password } = request.body;
    const result = authServices.authenticateUser(username, password);

    if (result.success) {
      response.status(200).json(result);
    } else {
      response.status(401).json(result);
    }
  }
}
