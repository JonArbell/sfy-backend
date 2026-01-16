import { Request, Response } from "express";
import userService from "../services/user-service";
import { asAuthRequest } from "../shared/utils/auth-request.util";

export const myAccount = async (req : Request, res : Response) => {

    const authRequest = asAuthRequest(req);

    const user = await userService.currentUser(authRequest.user.id);

    return res.status(200).json({
        data : user,
        message : 'success'
    });
    
}
