
export class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string, name?: string) {
    super(message);
    this.status = status;
    this.name = name || this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
