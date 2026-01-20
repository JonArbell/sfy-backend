import { generateToken, validateToken } from "../services/jwt-service";
import cryptoUtil from "../shared/utils/crypto.util";
import userRepository from "../repositories/user-repository";
import { HttpError } from "../exceptions/httpError";
import { RegisterRequestDTO } from "../dtos/request/register-request.dto";
import userProfileRepository from "../repositories/user-profile-repository";
import { MyAccountResponseDTO } from "../dtos/response/my-account-response.dto";
import { TokenPayload } from "../shared/types/token-payload";
import { UserRequestDTO } from "../dtos/request/user-request.dto";
import { UserProfileRequestDTO } from "../dtos/request/user-profile-request.dto";

const login = async (username: string, password: string) => {
  const findUser = await userRepository.findByUsername(username);

  if (!findUser)
    throw new HttpError(401, "Invalid credentials.", "UnauthorizedError");

  const passwordMatch = await cryptoUtil.decode(password, findUser.password);

  if (!passwordMatch)
    throw new HttpError(401, "Invalid credentials.", "UnauthorizedError");

  const tokenPayload: TokenPayload = {
    id: findUser.id,
    type: "access",
    username: findUser.username,
  };

  const token = generateToken(tokenPayload, "1h");

  tokenPayload.type = "refresh";

  const refreshToken = generateToken(tokenPayload, "7d");

  return {
    token: token,
    refreshToken: refreshToken,
  };
};

const generateTokenFromRefreshToken = async (refreshToken: string) => {
  const refreshTokenPayload = validateToken(refreshToken);

  if (refreshTokenPayload.type === "access")
    throw new HttpError(401, "Invalid token type.", "UnauthorizedError");

  const tokenPayload: TokenPayload = {
    id: refreshTokenPayload.id,
    username: refreshTokenPayload.username,
    type: "access",
  };

  const newToken = generateToken(tokenPayload, "1h");

  return {
    token: newToken,
  };
};

const createAccount = async (
  data: RegisterRequestDTO,
): Promise<MyAccountResponseDTO> => {
  const userExistsByUsername = await userRepository.findByUsername(
    data.username,
  );

  const userExistsByEmail = await userProfileRepository.findByEmail(data.email);

  console.log(userExistsByEmail);

  if (userExistsByUsername)
    throw new HttpError(409, "Username already taken.", "ConflictError");

  if (userExistsByEmail)
    throw new HttpError(409, "Email already registered.", "ConflictError");

  const hashedPassword = await cryptoUtil.encode(data.password);

  const credential: UserRequestDTO = {
    username: data.username,
    password: hashedPassword,
  };

  const userProfile: UserProfileRequestDTO = {
    email: data.email,
    fullName: data.fullName,
  };

  const savedUser = await userRepository.create(credential);

  const savedProfile = await userProfileRepository.create(
    savedUser.id,
    userProfile,
  );

  return {
    id: savedProfile.id,
    username: savedUser.username,
    fullName: savedProfile.fullName,
    email: savedProfile.email,
    icon: savedProfile.icon,
    createdAt: savedUser.createdAt,
    updatedAt: savedProfile.updatedAt,
  };
};

export default {
  generateTokenFromRefreshToken,
  createAccount,
  login,
};
