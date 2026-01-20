import { prisma } from "../app";
import { UserRequestDTO } from "../dtos/request/user-request.dto";

const findByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username: username,
    },
  });
};

const findById = (id: string) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

const create = (credentials: UserRequestDTO) => {
  return prisma.user.create({
    data: {
      username: credentials.username,
      password: credentials.password,
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
  findById,
  deleteAll,
  findByUsername,
  create,
  updateCredentials,
};
