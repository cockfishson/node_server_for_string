import { CustomError } from "../helpers/error_handlers/customResponseError.js";

export const errorMiddleware = (error, request, response) => {
  if (error instanceof CustomError) {
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } else {
    console.error("Unexpected error:", error);
    response.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
};
