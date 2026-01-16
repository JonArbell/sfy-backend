import {prisma} from '../app';

const create = (
    fullName : string, 
    email : string | null, 
    icon : string | null, 
    userId : string
) => {

    return prisma.userProfile.create({
        data : {
            fullName : fullName,
            email : email,
            icon : icon,
            userId : userId
        }
    });
}

const findByEmail = (email : string) => {
    return prisma.userProfile.findUnique({
        where : {
            email : email
        }
    });
}

const findByUserId = (userId : string) => {
    return prisma.userProfile.findUnique({
        where : {
            userId : userId
        }
    });
}

export default {
    findByUserId,
    findByEmail,
    create
}