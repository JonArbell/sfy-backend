import { UserProfileRequestDTO } from "../dtos/request/user-profile-request.dto";
import { MyAccountResponseDTO } from "../dtos/response/my-account-response.dto";
import { HttpError } from "../exceptions/httpError";
import { AuthProvider } from "../prisma/generated/prisma/enums";
import userProfileRepository from "../repositories/user-profile-repository";
import userRepository from "../repositories/user-repository";
import s3 from "../s3client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config";

type MulterFile = Express.Multer.File;

const BUCKET_NAME = process.env.AWS_S3_BUCKET!;

export const parseIcon = async (icon?: MulterFile): Promise<string | null> => {
  if (!icon) return null;

  if (!["image/png", "image/jpeg"].includes(icon.mimetype)) {
    throw new Error("Invalid file type");
  }

  const fileKey = `sfy/icons/${Date.now()}_${icon.originalname}`;

  const uploadCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    Body: icon.buffer,
    ContentType: icon.mimetype,
  });

  await s3.send(uploadCommand);

  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
};

const updateUserProfile = async (
  userId: string,
  provider: AuthProvider,
  userProfile: UserProfileRequestDTO,
  icon?: MulterFile,
): Promise<MyAccountResponseDTO> => {
  const findUser = await userRepository.findByIdAndProvider(userId, provider);
  if (!findUser) throw new HttpError(404, "No user found.");

  const findProfile = await userProfileRepository.findByUserId(findUser.id);
  if (!findProfile) throw new HttpError(404, "No user profile found.");

  const iconUrl = icon ? await parseIcon(icon) : findProfile.icon;

  const profileUpdatePayload: UserProfileRequestDTO = {
    ...userProfile,
    icon: iconUrl ?? undefined,
  };

  const updateProfile = await userProfileRepository.update(
    findProfile.id,
    profileUpdatePayload,
  );

  return {
    id: findUser.id,
    email: updateProfile.email,
    fullName: updateProfile.fullName,
    icon: updateProfile.icon,
    provider: findUser.provider,
    createdAt: findUser.createdAt,
    updatedAt: updateProfile.updatedAt,
    username: findUser.username,
  };
};

export default {
  updateUserProfile,
};
