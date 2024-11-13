import jwt from "jsonwebtoken";

export class JwtService {
  static verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  static verifyRefresh(token) {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESH);
  }
  static sign(payload, options = {}) {
    return jwt.sign(payload, process.env.JWT_SECRET, options);
  }
  static signRefresh(payload, options = {}) {
    return jwt.sign(payload, process.env.JWT_SECRET_REFRESH, options);
  }
}
