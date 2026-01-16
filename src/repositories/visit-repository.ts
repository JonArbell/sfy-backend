import { prisma } from "../app";
import { PageRequest } from "../shared/types/pagination.type";

const create = (urlId: string, visitorId: string) => {
  return prisma.visit.create({
    data: {
      urlId: urlId,
      visitorId: visitorId,
    },
  });
};

const visitorsTotalCountByUrlIds = async (urlIds: string[]) => {
  const uniqueVisitors = await prisma.visit.groupBy({
    by: ["visitorId"],
    where: {
      urlId: { in: urlIds },
    },
  });

  return uniqueVisitors.length;
};

const findAllVisitorsByUrlIds = async (
  urlIds: string[],
  pageable: PageRequest,
) => {
  const results = await Promise.all(
    urlIds.map((urlId) => {
      const skip = (pageable.currentPage - 1) * pageable.size;
      const take = pageable.size;

      return prisma.visit.findMany({
        where: { urlId },
        distinct: "visitorId",
        select: { visitor: true },
        skip: skip,
        take: take,
      });
    }),
  );

  return results.flat().map((v) => v.visitor);
};

export default {
  create,
  findAllVisitorsByUrlIds,
  visitorsTotalCountByUrlIds,
};
