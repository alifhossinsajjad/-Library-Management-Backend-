import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorPayload = err;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errorPayload = {
      name: "ValidationError",
      errors: err.errors,
    };
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
    errorPayload = err;
  } else if (err.message) {
    statusCode = 400;
    message = err.message;
    errorPayload = err;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: errorPayload,
  });
};
