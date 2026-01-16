import {prisma} from '../app';

const create = (urlId : string, password? : string, expirationDate? : string) => {
    return prisma.urlAccess.create({
        data : {
            password : password,
            expirationDate : expirationDate,
            urlId : urlId,
            active : true
        }
    });
}

export default {
    create
}