import userService from "../services/user-service";
import { asAuthRequest } from "../shared/utils/auth-request.util";
export const myAccount = async (req, res) => {
    const authRequest = asAuthRequest(req);
    const user = await userService.currentUser(authRequest.user.id);
    return res.status(200).json({
        data: user,
        message: 'success'
    });
};
