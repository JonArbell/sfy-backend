import {
  UpdateUserRequestDTO,
  UserRequestDTO,
} from "../dtos/request/user-request.dto";
import { HttpError } from "../exceptions/httpError";
import userProfileRepository from "../repositories/user-profile-repository";
import userRepository from "../repositories/user-repository";
import cryptoUtil from "../shared/utils/crypto.util";

const updateUsernameAndPassword = async (
  id: string,
  updateCredentials: UpdateUserRequestDTO,
) => {
  const findUser = await userRepository.findById(id);

  if (!findUser)
    throw new HttpError(
      404,
      `Cannot update. This user is not yet registered.`,
      "UserNotFound",
    );

  const confirmPasswordMatch =
    updateCredentials.confirmPassword === updateCredentials.password;

  const passwordMatch = await cryptoUtil.decode(
    updateCredentials.oldPassword,
    findUser.password,
  );

  const passwordSame = await cryptoUtil.decode(
    updateCredentials.password,
    findUser.password,
  );

  if (!confirmPasswordMatch)
    throw new HttpError(409, "Confirm password not match.");

  if (!passwordMatch) throw new HttpError(409, "Password not match.");

  if (passwordSame)
    throw new HttpError(409, "Cant change using same password.");

  const credentials: UserRequestDTO = {
    password: await cryptoUtil.encode(updateCredentials.password),
    username: updateCredentials.username,
  };

  const update = await userRepository.updateCredentials(id, credentials);

  const findProfile = await userProfileRepository.findByUserId(update.id);

  if (!findProfile) throw new HttpError(404, "Profile not found.");

  return {
    id: update.id,
    username: update.username,
    email: findProfile?.email ?? "",
    fullName: findProfile.fullName,
    createdAt: update.createdAt,
    updatedAt: update.updatedAt ?? findProfile.updatedAt,
    icon: findProfile?.icon,
  };
};

export default { updateUsernameAndPassword };
