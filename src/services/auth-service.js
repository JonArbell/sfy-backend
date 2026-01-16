import { generateToken, validateToken } from '../services/jwt-service';
import cryptoUtil from '../shared/utils/crypto.util';
import userRepository from '../repositories/user-repository';
import { HttpError } from '../exceptions/httpError';
import userProfileRepository from '../repositories/user-profile-repository';
const login = async (username, password) => {
    const findUser = await userRepository.findByUsername(username);
    if (!findUser)
        throw new HttpError(401, 'Invalid credentials.', 'UnauthorizedError');
    const passwordMatch = await cryptoUtil.decode(password, findUser.password);
    if (!passwordMatch)
        throw new HttpError(401, 'Invalid credentials.', 'UnauthorizedError');
    const tokenPayload = {
        id: findUser.id,
        type: 'access',
        username: findUser.username
    };
    const token = generateToken(tokenPayload, "1h");
    tokenPayload.type = 'refresh';
    const refreshToken = generateToken(tokenPayload, "7d");
    return {
        token: token,
        refreshToken: refreshToken
    };
};
const generateTokenFromRefreshToken = async (refreshToken) => {
    const refreshTokenPayload = validateToken(refreshToken);
    if (refreshTokenPayload.type === 'access')
        throw new HttpError(401, 'Invalid token type.', 'UnauthorizedError');
    const tokenPayload = {
        id: refreshTokenPayload.id,
        username: refreshTokenPayload.username,
        type: 'access'
    };
    const newToken = generateToken(tokenPayload, "1h");
    return {
        token: newToken
    };
};
const createAccount = async (data) => {
    const userExistsByUsername = await userRepository.findByUsername(data.username);
    const userExistsByEmail = await userProfileRepository.findByEmail(data.email);
    if (userExistsByUsername)
        throw new HttpError(409, 'Username already taken.', 'ConflictError');
    if (userExistsByEmail)
        throw new HttpError(409, 'Email already registered.', 'ConflictError');
    const hashedPassword = await cryptoUtil.encode(data.password);
    const savedUser = await userRepository.create(data.username, hashedPassword);
    const savedProfile = await userProfileRepository.create(data.fullName, data.email, data.icon, savedUser.id);
    return {
        id: savedProfile.id,
        fullName: savedProfile.fullName,
        email: savedProfile.email,
        icon: savedProfile.icon,
        updatedAt: savedProfile.updatedAt,
    };
};
export default {
    generateTokenFromRefreshToken,
    createAccount,
    login
};
