import { Request, Response } from "express";
import myAccountService from "../services/my-account-service";
import { asAuthRequest } from "../shared/utils/auth-request.util";
import userService from "../services/user-service";
import { UpdateUserRequestDTO } from "../dtos/request/user-request.dto";
import { UserProfileRequestDTO } from "../dtos/request/user-profile-request.dto";
import userProfileService from "../services/user-profile-service";
import { MulterFile } from "../shared/types/multerfile.type";

const getMyAccount = async (req: Request, res: Response) => {
  const authRequest = asAuthRequest(req);

  const myAccount = await myAccountService.findMyAccount(
    authRequest.user.id,
    authRequest.user.provider,
  );

  return res.status(200).json({
    data: myAccount,
    message: "success",
  });
};

const updateCredentials = async (req: Request, res: Response) => {
  const authRequest = asAuthRequest(req);

  const form = req.body as UpdateUserRequestDTO;

  const response = await userService.updateUsernameAndPassword(
    authRequest.user.id,
    form,
  );

  return res.status(200).json({
    data: response,
    message: "success",
  });
};

const updateUserProfile = async (req: Request, res: Response) => {
  const authRequest = asAuthRequest(req);

  const form: UserProfileRequestDTO = {
    fullName: req.body.fullName,
    email: req.body.email,
  };

  const icon = req.file;

  const response = await userProfileService.updateUserProfile(
    authRequest.user.id,
    authRequest.user.provider,
    form,
    icon,
  );

  res.status(200).json({
    data: response,
    message: "success",
  });
};

export default {
  updateUserProfile,
  updateCredentials,
  getMyAccount,
};
