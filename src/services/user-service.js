import { HttpError } from "../exceptions/httpError";
import userRepository from "../repositories/user-repository";
import userProfileRepository from "../repositories/user-profile-repository";
const currentUser = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user)
        throw new HttpError(404, 'User not found.', 'NotFoundError');
    const findProfile = await userProfileRepository.findByUserId(userId);
    return {
        id: user.id,
        username: user.username,
        email: findProfile?.email,
        fullName: findProfile?.fullName,
        icon: findProfile?.icon
    };
};
export default {
    currentUser
};
