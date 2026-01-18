import { prisma } from "../app";
import { PageRequest } from "../shared/types/pagination.type";
import { VisitModel } from "../shared/types/visit-model.type";

const create = (urlId: string, visitorId: string) => {
  return prisma.visit.create({
    data: {
      urlId: urlId,
      visitorId: visitorId,
    },
  });
};

const findCountsAndModelsByUrlIdsGroupByModel = (
  urlIds: string[],
  model: VisitModel,
) => {
  return prisma.visit.groupBy({
    by: [model],
    where: {
      urlId: { in: urlIds },
    },
    _count: { urlId: true },
    orderBy: { _count: { urlId: "desc" } },
  });
};

const findAllVisitorsByUrlIdsWithPaginate = async (
  urlIds: string[],
  pageable: PageRequest,
) => {
  const results = await Promise.all(
    urlIds.map((urlId) => {
      const skip = (pageable.currentPage - 1) * pageable.size;
      const take = pageable.size;

      return prisma.visit.findMany({
        where: { urlId },
        distinct: ["visitorId"],
        select: { visitor: true },
        skip: skip,
        take: take,
      });
    }),
  );

  return results.flat().map((v) => v.visitor);
};

const findAllVisitorsByUrlIds = async (urlIds: string[]) => {
  const results = await Promise.all(
    urlIds.map((urlId) => {
      return prisma.visit.findMany({
        where: { urlId },
        select: { visitor: true },
      });
    }),
  );

  return results.flat().map((v) => v.visitor);
};

const findAllVisitorsByUrlId = (urlId: string) => {
  return prisma.visit.findMany({
    where: { urlId: urlId },
    distinct: "visitorId",
    select: { visitor: true },
  });
};

const findAllVisitsByUrlId = (urlId: string) => {
  return prisma.visit.findMany({
    where: { urlId: urlId },
  });
};

const findAllVisitsByUrlIds = (urlIds: string[]) => {
  return prisma.visit.findMany({
    where: {
      urlId: {
        in: urlIds,
      },
    },
  });
};

const totalCountByUrlIds = (urlIds: string[]) => {
  return prisma.visit.count({
    where: {
      urlId: {
        in: urlIds,
      },
    },
  });
};

export default {
  findAllVisitsByUrlIds,
  findAllVisitorsByUrlIds,
  findAllVisitsByUrlId,
  findCountsAndModelsByUrlIdsGroupByModel,
  create,
  findAllVisitorsByUrlIdsWithPaginate,
  totalCountByUrlIds,
  findAllVisitorsByUrlId,
};
