import { HttpError } from "../exceptions/httpError";
export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.status).json({
            message: err.message,
            type: err.name
        });
    }
    return res.status(500).json({
        message: err.message,
        type: err.name
    });
};
