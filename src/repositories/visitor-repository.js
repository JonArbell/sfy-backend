import { prisma } from '../app';
const findVisitorByIpAddress = (ipAddress) => {
    return prisma.visitor.findUnique({
        where: {
            ipAddress: ipAddress
        }
    });
};
const create = (ipAddress, location, deviceType) => {
    return prisma.visitor.create({
        data: {
            ipAddress: ipAddress,
            location: location,
            deviceType: deviceType
        }
    });
};
const update = (visitorId, ipAddress, location, deviceType) => {
    return prisma.visitor.update({
        where: { id: visitorId },
        data: {
            ipAddress,
            location,
            deviceType
        },
    });
};
export default {
    update,
    create,
    findVisitorByIpAddress
};
