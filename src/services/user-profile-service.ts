import { UserProfileRequestDTO } from "../dtos/request/user-profile-request.dto";
import { MyAccountResponseDTO } from "../dtos/response/my-account-response.dto";
import { HttpError } from "../exceptions/httpError";
import userProfileRepository from "../repositories/user-profile-repository";
import userRepository from "../repositories/user-repository";

const updateUserProfile = async (
  userId: string,
  userProfile: UserProfileRequestDTO,
): Promise<MyAccountResponseDTO> => {
  const findUser = await userRepository.findById(userId);

  if (!findUser) throw new HttpError(404, "No user found.");

  const findProfile = await userProfileRepository.findByUserId(findUser.id);

  if (!findProfile) throw new HttpError(404, "No user profile found.");

  const updateProfile = await userProfileRepository.update(
    findProfile.id,
    userProfile,
  );

  return {
    id: findUser.id,
    email: updateProfile.email,
    fullName: updateProfile.fullName,
    icon: updateProfile.icon,
    createdAt: findUser.createdAt,
    updatedAt: updateProfile.updatedAt,
    username: findUser.username,
  };
};

export default {
  updateUserProfile,
};
