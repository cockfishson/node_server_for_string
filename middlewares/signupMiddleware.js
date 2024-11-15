import { z } from "zod";
import { CustomError } from "../helpers/error_handlers/customResponseError.js";
import { HttpStatus } from "../helpers/error_handlers/responseErrorCodes.js";

const requiredFieldsSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  confirmPassword: z.string().nonempty(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  age: z.preprocess((val) => parseInt(val, 10), z.number().nonnegative()),
});

const signupSchema = z
  .object({
    username: z.string().min(3, "Username too short"),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[`!@#$%^&*()_\-+={}[\];':"|,.<>/?~]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().nonempty("Password confirmation is required"),
    firstName: z.string().min(3, "First name should be 3 symbols or more"),
    lastName: z.string().min(3, "Last name should be 3 symbols or more"),
    age: z.preprocess(
      (val) => parseInt(val, 10),
      z.number().gt(0, "Age must be greater than 0")
    ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export const signupMiddleware = (req, res, next) => {
  try {
    const requiredFieldsResult = requiredFieldsSchema.safeParse(req.body);
    if (!requiredFieldsResult.success) {
      throw new CustomError(HttpStatus.BAD_REQUEST, {
        form: "All fields are required",
      });
    }

    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      const firstError = result.error.errors[0];
      throw new CustomError(HttpStatus.BAD_REQUEST, {
        [firstError.path[0]]: firstError.message,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
