import { CustomError } from "./custom-errors";

export class NotAutherizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super("Not Autherized");
    Object.setPrototypeOf(this, NotAutherizedError.prototype);
  }
  serializeErrors() {
    return [{ message: "Not Autherized" }];
  }
}
