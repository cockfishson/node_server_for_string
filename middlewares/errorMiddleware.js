import { CustomError } from "../helpers/error_handlers/customResponseError.js";
// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (error, request, response, next) => {
  if (error instanceof CustomError) {
    response.status(error.statusCode).send({
      success: false,
      message: error.message || null,
      details: error.details || null,
    });
  } else {
    response.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
};
