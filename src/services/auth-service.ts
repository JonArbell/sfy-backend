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
import { GoogleOAuthProfileRequestDTO } from "../dtos/request/google-auth-request.dto";
import { AuthProvider } from "../prisma/generated/prisma/enums";

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
    provider: findUser.provider,
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
    provider: refreshTokenPayload.provider,
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

  if (userExistsByUsername)
    throw new HttpError(409, "Username already taken.", "ConflictError");

  if (userExistsByEmail)
    throw new HttpError(409, "Email already registered.", "ConflictError");

  const hashedPassword = await cryptoUtil.encode(data.password);

  const credential: UserRequestDTO = {
    username: data.username,
    password: hashedPassword,
    provider: AuthProvider.LOCAL,
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
    id: savedUser.id,
    username: savedUser.username,
    fullName: savedProfile.fullName,
    email: savedProfile.email,
    icon: savedProfile.icon,
    provider: savedUser.provider,
    createdAt: savedUser.createdAt,
    updatedAt: savedProfile.updatedAt,
  };
};

const findOrCreateGoogleUser = async (
  googleProfile: GoogleOAuthProfileRequestDTO,
) => {
  const email = googleProfile._json.email;

  if (!email) throw new Error("Google account has no email");

  const existingProfile = await userProfileRepository.findByEmail(email);

  if (existingProfile) {
    const findUser = await userRepository.findByIdAndProvider(
      existingProfile.userId,
      AuthProvider.GOOGLE,
    );

    if (!findUser) throw new HttpError(500, "Internal server error.");

    const tokenPayload: TokenPayload = {
      id: findUser.id,
      type: "access",
      provider: findUser.provider,
      username: findUser.username,
    };

    const token = generateToken(tokenPayload, "1h");

    tokenPayload.type = "refresh";

    const refreshToken = generateToken(tokenPayload, "7d");

    return {
      token: token,
      refreshToken: refreshToken,
    };
  }

  const username = await generateUsername(googleProfile.displayName, email);

  const fullName = googleProfile.displayName;

  const icon = googleProfile.photos[0].value;

  const dummyPassword = cryptoUtil.randomUUID();

  const savedUser = await userRepository.create({
    password: dummyPassword,
    username: username,
    provider: AuthProvider.GOOGLE,
  });

  await userProfileRepository.create(savedUser.id, {
    fullName,
    email,
    icon,
  });

  const tokenPayload: TokenPayload = {
    id: savedUser.id,
    type: "access",
    provider: savedUser.provider,
    username: savedUser.username,
  };

  const token = generateToken(tokenPayload, "1h");

  tokenPayload.type = "refresh";

  const refreshToken = generateToken(tokenPayload, "7d");

  return {
    token: token,
    refreshToken: refreshToken,
  };
};

const generateUsername = async (
  fullName: string,
  email: string,
): Promise<string> => {
  const base = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  let username = base;

  let exists = await userRepository.findByUsername(username);
  while (exists) {
    username = `${base}${Math.floor(1000 + Math.random() * 9000)}`;
    exists = await userRepository.findByUsername(username);
  }

  return username;
};

export default {
  generateTokenFromRefreshToken,
  createAccount,
  login,
  findOrCreateGoogleUser,
};
