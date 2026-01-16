import { prisma } from '../app';
const create = (urlId, password, expirationDate) => {
    return prisma.urlAccess.create({
        data: {
            password: password,
            expirationDate: expirationDate,
            urlId: urlId,
            active: true
        }
    });
};
export default {
    create
};
