
import jwt, { SignOptions } from "jsonwebtoken";
import { TokenPayload } from "../shared/types/token-payload";
import { TimeUnit } from "../shared/types/time-unit.type";
import { HttpError } from "../exceptions/httpError";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

type JWTExpire = `${number}${TimeUnit}`;

const generateToken = (tokenPayload: TokenPayload, expiresIn: JWTExpire): string => {
  const options: SignOptions = { expiresIn } 
  return jwt.sign(tokenPayload, JWT_SECRET, options);
};

const validateToken = (token: string) : TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as TokenPayload;
  } catch (err) {
    throw new HttpError(401, 
      'Invalid or expired token.', 
      'UnauthorizedError'
    );
  }
};

export {
  generateToken,
  validateToken,
};
