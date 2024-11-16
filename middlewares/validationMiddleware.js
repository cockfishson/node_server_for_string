import { CustomError } from "../helpers/error_handlers/customResponseError.js";
import { HttpStatus } from "../helpers/error_handlers/responseErrorCodes.js";
// eslint-disable-next-line no-unused-vars
export const validationMiddleware = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const firstError = result.error.errors[0];
    throw new CustomError(HttpStatus.BAD_REQUEST, {
      [firstError.path[0]]: firstError.message,
    });
  }
  next();
};
