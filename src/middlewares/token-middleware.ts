import { Request, Response, NextFunction } from "express";
import {validateToken} from "../services/jwt-service";
import { HttpError } from "../exceptions/httpError";
import { asAuthRequest } from "../shared/utils/auth-request.util";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HttpError(401, 'Authorization header missing or invalid.', 'UnauthorizedError');
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = validateToken(token);
    asAuthRequest(req).user = decoded; 
    next();
  } catch (err) {
    throw new HttpError(401, 'Invalid or expired token.', 'UnauthorizedError');
  }
  
};
