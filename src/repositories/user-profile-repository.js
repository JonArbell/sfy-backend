import { prisma } from '../app';
const create = (fullName, email, icon, userId) => {
    return prisma.userProfile.create({
        data: {
            fullName: fullName,
            email: email,
            icon: icon,
            userId: userId
        }
    });
};
const findByEmail = (email) => {
    return prisma.userProfile.findUnique({
        where: {
            email: email
        }
    });
};
const findByUserId = (userId) => {
    return prisma.userProfile.findUnique({
        where: {
            userId: userId
        }
    });
};
export default {
    findByUserId,
    findByEmail,
    create
};
