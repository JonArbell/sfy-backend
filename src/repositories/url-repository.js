import { prisma } from '../app';
const findAllByUserId = (userId) => {
    return prisma.url.findMany({
        where: {
            userId: userId
        }
    });
};
const findAllUrlIdsByUserId = (userId) => {
    return prisma.url.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true
        }
    });
};
const create = (originalUrl, shortUrl, userId) => {
    return prisma.url.create({
        data: {
            original: originalUrl,
            short: shortUrl,
            userId: userId
        }
    });
};
const findUrlByShort = (shortUrl) => {
    return prisma.url.findUnique({
        where: {
            short: shortUrl
        }
    });
};
const findAllIncludeUrlAccessByUserId = (userId, pageable) => {
    const skip = (pageable.currentPage - 1) * pageable.size;
    const take = pageable.size;
    return prisma.url.findMany({
        where: {
            userId
        },
        include: {
            status: true
        },
        skip: skip,
        take: take
    });
};
const totalCountByUserId = (userId) => {
    return prisma.url.count({
        where: {
            userId: userId
        }
    });
};
const findByIdAndUserId = (id, userId) => {
    return prisma.url.findUnique({
        where: {
            id,
            userId
        }
    });
};
const deleteUrlByIdAndUserId = (id, userId) => {
    return prisma.url.delete({
        where: {
            id: id,
            userId: userId
        }
    });
};
export default {
    totalCountByUserId,
    findUrlByShort,
    create,
    findAllIncludeUrlAccessByUserId,
    findByIdAndUserId,
    findAllByUserId,
    findAllUrlIdsByUserId,
    deleteUrlByIdAndUserId
};
