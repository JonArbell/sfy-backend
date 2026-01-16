import { prisma } from "../app";
const create = (urlId, visitorId) => {
    return prisma.visit.create({
        data: {
            urlId: urlId,
            visitorId: visitorId,
        },
    });
};
const visitorsTotalCountByUrlIds = async (urlIds) => {
    const uniqueVisitors = await prisma.visit.groupBy({
        by: ["visitorId"],
        where: {
            urlId: { in: urlIds },
        },
    });
    return uniqueVisitors.length;
};
const findAllVisitorsByUrlIds = async (urlIds, pageable) => {
    const results = await Promise.all(urlIds.map((urlId) => {
        const skip = (pageable.currentPage - 1) * pageable.size;
        const take = pageable.size;
        return prisma.visit.findMany({
            where: { urlId },
            distinct: "visitorId",
            select: { visitor: true },
            skip: skip,
            take: take,
        });
    }));
    return results.flat().map((v) => v.visitor);
};
export default {
    create,
    findAllVisitorsByUrlIds,
    visitorsTotalCountByUrlIds,
};
