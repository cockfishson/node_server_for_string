import { authServices } from "../services/authServices.js";

export class AuthController {
  static login(request, response) {
    const { username, password } = request.body;
    authServices.authenticateUser(username, password);
    response.status(200).json({ success: true });
  }
}
