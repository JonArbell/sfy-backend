export class HttpError extends Error {
    status;
    constructor(status, message, name) {
        super(message);
        this.status = status;
        this.name = name || this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
