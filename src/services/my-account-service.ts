import { HttpError } from "../exceptions/httpError";
import userRepository from "../repositories/user-repository";
import userProfileRepository from "../repositories/user-profile-repository";
import { MyAccountResponseDTO } from "../dtos/response/my-account-response.dto";
import { AuthProvider } from "../prisma/generated/prisma/enums";

const findMyAccount = async (
  userId: string,
  provider: AuthProvider,
): Promise<MyAccountResponseDTO> => {
  const user = await userRepository.findByIdAndProvider(userId, provider);

  if (!user) throw new HttpError(404, "User not found.", "NotFoundError");

  const findProfile = await userProfileRepository.findByUserId(userId);

  if (!findProfile)
    throw new HttpError(404, "User not found.", "NotFoundError");

  return {
    id: user.id,
    username: user.username,
    email: findProfile?.email ?? "",
    fullName: findProfile.fullName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt ?? findProfile.updatedAt,
    provider: user.provider,
    icon: findProfile?.icon,
  };
};

export default {
  findMyAccount,
};
