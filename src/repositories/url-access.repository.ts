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

const update = (
  urlId: string,
  active: boolean,
  password?: string,
  expirationDate?: string,
) => {
  return prisma.urlAccess.update({
    where: {
      urlId: urlId,
    },
    data: {
      password: password,
      expirationDate: expirationDate ? new Date(expirationDate) : null,
      active: active,
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
  update,
};
