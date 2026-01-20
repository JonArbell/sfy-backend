import { prisma } from "../app";

const create = (urlId: string, password?: string, expirationDate?: string) => {
  return prisma.urlAccess.create({
    data: {
      password: password,
      expirationDate: expirationDate ? new Date(expirationDate) : null,
      urlId: urlId,
      active: true,
    },
  });
};

const findByUrlId = (urlId: string) => {
  return prisma.urlAccess.findFirst({
    where: {
      urlId: urlId,
    },
  });
};

export default {
  findByUrlId,
  create,
};
