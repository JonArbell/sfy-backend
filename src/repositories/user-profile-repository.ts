import { prisma } from "../app";
import { UserProfileRequestDTO } from "../dtos/request/user-profile-request.dto";

const create = (userId: string, userProfile: UserProfileRequestDTO) => {
  return prisma.userProfile.create({
    data: {
      fullName: userProfile.fullName,
      email: userProfile.email,
      icon: userProfile.icon,
      userId: userId,
    },
  });
};

const update = (id: string, userProfile: UserProfileRequestDTO) => {
  return prisma.userProfile.update({
    where: {
      id: id,
    },
    data: {
      fullName: userProfile.fullName,
      email: userProfile.email,
      icon: userProfile.icon,
    },
  });
};

const findByEmail = (email: string) => {
  return prisma.userProfile.findUnique({
    where: {
      email: email,
    },
  });
};

const findByUserId = (userId: string) => {
  return prisma.userProfile.findUnique({
    where: {
      userId: userId,
    },
  });
};

export default {
  findByUserId,
  findByEmail,
  create,
  update,
};
