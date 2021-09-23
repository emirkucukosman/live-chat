export default class ApiError {
  statusCode: number;
  name: string;
  message: string;

  private constructor(statusCode: number, name: string, message: string) {
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
  }

  static badRequest(message: string = "Bad Request"): ApiError {
    return new ApiError(400, "BadRequestError", message);
  }

  static authorization(message: string = "Unauthorized"): ApiError {
    return new ApiError(401, "AuthorizationError", message);
  }

  static notFound(message: string = "Not Found Error"): ApiError {
    return new ApiError(404, "NotFoundError", message);
  }

  static internal(message: string = "Internal Server Error"): ApiError {
    return new ApiError(500, "InternalServerError", message);
  }
}
