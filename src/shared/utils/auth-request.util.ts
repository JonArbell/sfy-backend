import { Request } from "express";
import { AuthRequest } from "../types/auth-request.type";

export const asAuthRequest = (req : Request) => {
    return req as AuthRequest;
}
