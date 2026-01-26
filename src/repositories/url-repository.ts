import { prisma } from "../app";
import { PageRequest } from "../shared/types/pagination.type";
import { FindUrlOptions } from "../shared/types/url-options.type";

const findAllByUserId = (userId: string) => {
  return prisma.url.findMany({
    where: {
      userId: userId,
    },
  });
};

const recent5UrlsByUserId = (userId: string) => {
  return prisma.url.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
};

const findAllUrlIdsByUserId = (
  userId: string,
  options: FindUrlOptions = {},
) => {
  const { take, withVisits } = options;

  return prisma.url.findMany({
    where: {
      userId,
      ...(withVisits && {
        visits: {
          some: {},
        },
      }),
    },
    select: {
      id: true,
    },
    ...(take && { take }),
  });
};

const create = (originalUrl: string, shortUrl: string, userId: string) => {
  return prisma.url.create({
    data: {
      original: originalUrl,
      short: shortUrl,
      userId: userId,
    },
  });
};

const update = (id: string, originalUrl: string, userId: string) => {
  return prisma.url.update({
    where: {
      id: id,
      userId: userId,
    },
    data: {
      original: originalUrl,
    },
  });
};

const findUrlByShort = (shortUrl: string) => {
  return prisma.url.findUnique({
    where: {
      short: shortUrl,
    },
  });
};

const findAllIncludeUrlAccessByUserIdWithPaginate = (
  userId: string,
  pageable: PageRequest,
) => {
  const skip = (pageable.currentPage - 1) * pageable.size;
  const take = pageable.size;

  return prisma.url.findMany({
    where: {
      userId,
    },
    include: {
      status: true,
    },
    skip: skip,
    take: take,
  });
};

const totalCountByUserId = (userId: string) => {
  return prisma.url.count({
    where: {
      userId: userId,
    },
  });
};

const findByIdAndUserId = (id: string, userId: string) => {
  return prisma.url.findUnique({
    where: {
      id,
      userId,
    },
  });
};

const findById = (id: string) => {
  return prisma.url.findUnique({
    where: {
      id,
    },
  });
};

const deleteUrlByIdAndUserId = (id: string, userId: string) => {
  return prisma.url.delete({
    where: {
      id: id,
      userId: userId,
    },
  });
};

export default {
  recent5UrlsByUserId,
  totalCountByUserId,
  findUrlByShort,
  create,
  findAllIncludeUrlAccessByUserIdWithPaginate,
  findByIdAndUserId,
  findAllByUserId,
  findAllUrlIdsByUserId,
  deleteUrlByIdAndUserId,
  findById,
  update,
};
