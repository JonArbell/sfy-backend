import { prisma } from '../app';
const findByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    });
};
const findById = (id) => {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    });
};
const create = (username, password) => {
    return prisma.user.create({
        data: {
            username: username,
            password: password
        }
    });
};
const deleteAll = () => {
    return prisma.user.deleteMany();
};
export default {
    findById,
    deleteAll,
    findByUsername,
    create
};
