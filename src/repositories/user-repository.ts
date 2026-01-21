import { prisma } from "../app";
import { UserRequestDTO } from "../dtos/request/user-request.dto";
import { AuthProvider } from "../prisma/generated/prisma/enums";

const findByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username: username,
    },
  });
};

const findByIdAndProvider = (
  id: string,
  provider: AuthProvider = AuthProvider.LOCAL,
) => {
  return prisma.user.findUnique({
    where: {
      id: id,
      provider: provider,
    },
  });
};

const create = (credentials: UserRequestDTO) => {
  return prisma.user.create({
    data: {
      username: credentials.username,
      password: credentials.password,
      provider: credentials.provider,
    },
  });
};

const updateCredentials = (id: string, credentials: UserRequestDTO) => {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: credentials.username,
      password: credentials.password,
    },
  });
};

const deleteAll = () => {
  return prisma.user.deleteMany();
};

export default {
  findByIdAndProvider,
  deleteAll,
  findByUsername,
  create,
  updateCredentials,
};
