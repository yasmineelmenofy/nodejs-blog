import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiErrors";
import { ZodError } from "zod";
import mongoose from "mongoose";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.error("Error:", err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      type: "ApiError",
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      type: "ValidationError",
      message: "Validation failed",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      type: "CastError",
      message: `Invalid ${err.path}: ${err.value}`,
    });
    return;
  }

  if (err.code === 11000) {
    res.status(400).json({
      success: false,
      type: "DuplicateKeyError",
      message: "Duplicate field value",
      details: err.keyValue,
    });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      type: "DatabaseValidationError",
      message: "Database validation failed",
      errors: Object.values(err.errors).map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    });
    return;
  }

  res.status(500).json({
    success: false,
    type: "InternalServerError",
    message: "Something went wrong",
  });
}
