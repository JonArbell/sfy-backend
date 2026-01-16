import { HttpError } from "../../exceptions/httpError";
const SHORT_URL_LENGTH = 5;
const SALT_ROUNDS = 5;
const generateRandomString = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
export const shortenUrl = async (originalUrl) => {
    if (!originalUrl || originalUrl.length < 3) {
        throw new HttpError(400, 'URL is too short to shorten.', 'ValidationError');
    }
    const cleanedUrl = originalUrl.replace(/^https?:\/\//, '').trim();
    if (cleanedUrl.length < 3) {
        throw new HttpError(400, 'Invalid domain.', 'ValidationError');
    }
    // Generate exactly 5 characters
    const shortCode = generateRandomString(SHORT_URL_LENGTH);
    return shortCode;
};
