import { CustomError } from "./custom-errors";
import { FieldValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: FieldValidationError[]) {
    super("Invalid request paramaeter");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.path };
    });
  }
}
