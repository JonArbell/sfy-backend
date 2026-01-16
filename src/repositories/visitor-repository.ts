import {prisma} from '../app';

const findVisitorByIpAddress = (ipAddress : string) => {
    return prisma.visitor.findUnique({
        where : {
            ipAddress : ipAddress
        }
    });
} 

const create = (ipAddress : string, location : string, deviceType : string) => {
    return prisma.visitor.create({
        data : {
            ipAddress : ipAddress,
            location : location,
            deviceType : deviceType
        }
    });
}

const update = (visitorId : string, ipAddress : string, location : string, deviceType : string) => {
    return prisma.visitor.update({
        where: { id: visitorId },
        data: {
        ipAddress,
        location,
        deviceType
        },
    });
}

export default {
    update,
    create,
    findVisitorByIpAddress
}