export class CustomError extends Error {
  constructor(statusCode, message) {
    super(typeof message === "string" ? message : "");
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.details = typeof message === "object" ? message : null;
    Error.captureStackTrace(this, this.constructor);
  }
}
