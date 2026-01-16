import {prisma} from '../app';
import { PageRequest } from '../shared/types/pagination.type';

const findAllByUserId = (userId : string) => {

    return prisma.url.findMany({
        where : {
            userId : userId
        }
    });

}

const findAllUrlIdsByUserId = (userId : string) => {
    return prisma.url.findMany({
        where : {
            userId : userId
        },
        select : {
            id : true
        }
    });
}

const create =  (originalUrl : string, shortUrl : string, userId : string) => {
    return prisma.url.create({
        data : {
            original : originalUrl,
            short : shortUrl,
            userId : userId
        }
    });
}

const findUrlByShort = (shortUrl : string) => {
    return prisma.url.findUnique({
        where : {
            short : shortUrl
        }
    })
}

const findAllIncludeUrlAccessByUserId = (
    userId: string,
    pageable: PageRequest
) => {
    const skip = (pageable.currentPage - 1) * pageable.size;
    const take = pageable.size;

    return prisma.url.findMany({
        where: {
            userId
        },
        include: {
            status: true
        },
        skip : skip,
        take : take
    });
};

const totalCountByUserId = (userId : string) => {
    return prisma.url.count({
        where : {
            userId : userId
        }
    })
}

const findByIdAndUserId = (id : string, userId : string) => {

    return prisma.url.findUnique({
        where : {
            id,
            userId
        }
    });
}

const deleteUrlByIdAndUserId = (id : string, userId : string) => {
    return prisma.url.delete({
        where : {
            id : id,
            userId : userId
        }
    })
}

export default{
    totalCountByUserId,
    findUrlByShort,
    create,
    findAllIncludeUrlAccessByUserId,
    findByIdAndUserId,
    findAllByUserId,
    findAllUrlIdsByUserId,
    deleteUrlByIdAndUserId
}
