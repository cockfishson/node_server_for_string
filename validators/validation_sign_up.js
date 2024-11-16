import { z } from "zod";

export const requiredFieldsSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    age: z.string(),
  })
  .superRefine((data, ctx) => {
    const missingFields = Object.entries(data).filter(
      // eslint-disable-next-line no-unused-vars
      ([key, value]) => value === undefined || value === "",
    );
    if (missingFields.length > 0) {
      ctx.addIssue({
        path: ["form"],
        message: "All fields must be filled",
      });
    }
  });

export const signupSchema = z
  .object({
    username: z.string().min(3, "Username too short"),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[`!@#$%^&*()_\-+={}[\];':"|,.<>/?~]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().nonempty("Password confirmation is required"),
    firstName: z.string().min(3, "First name should be 3 symbols or more"),
    lastName: z.string().min(3, "Last name should be 3 symbols or more"),
    age: z.preprocess(
      (val) => parseInt(val, 10),
      z.number().gt(0, "Age must be greater than 0"),
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
