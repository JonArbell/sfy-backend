import { Request } from "express";
import { TokenPayload } from "./token-payload";

export interface AuthRequest extends Request {
  user: TokenPayload; 
}