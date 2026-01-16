import { Request, Response } from "express";
import { HttpError } from "../exceptions/httpError";

export const errorHandler = (err : Error, req : Request, res : Response, next : Function) => {

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
      type: err.name
    });
  }

  return res.status(500).json({
    message: err.message,
    type : err.name
  });
}