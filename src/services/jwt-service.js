import jwt from "jsonwebtoken";
import { HttpError } from "../exceptions/httpError";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const generateToken = (tokenPayload, expiresIn) => {
    const options = { expiresIn };
    return jwt.sign(tokenPayload, JWT_SECRET, options);
};
const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (err) {
        throw new HttpError(401, 'Invalid or expired token.', 'UnauthorizedError');
    }
};
export { generateToken, validateToken, };
