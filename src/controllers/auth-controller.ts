import { Request, Response } from "express";
import authService from "../services/auth-service";
import { RegisterRequestDTO } from "../dtos/request/register-request.dto";
import { GoogleOAuthProfileRequestDTO } from "../dtos/request/google-auth-request.dto";

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const response = await authService.login(username, password);

  return res.status(200).json({
    data: response,
    message: "success",
  });
};

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const newToken =
    await authService.generateTokenFromRefreshToken(refreshToken);

  return res.status(201).json({
    data: newToken,
    message: "success",
  });
};

const register = async (req: Request, res: Response) => {
  const data = req.body as RegisterRequestDTO;

  const response = await authService.createAccount(data);

  return res.status(201).json({
    data: response,
    message: "Account created successfully.",
  });
};

const loginOrCreateGoogleAccount = async (
  googleProfile: GoogleOAuthProfileRequestDTO,
) => {
  return await authService.findOrCreateGoogleUser(googleProfile);
};

const handleRedirectGoogle = async (req: Request, res: Response) => {
  const user = req.user as { token: string; refreshToken: string };

  const redirectUrl = new URL("http://localhost:4200/auth/callback");
  redirectUrl.searchParams.append("token", user.token);
  redirectUrl.searchParams.append("refreshToken", user.refreshToken);

  res.redirect(redirectUrl.toString());
};

export default {
  handleRedirectGoogle,
  loginOrCreateGoogleAccount,
  login,
  refreshToken,
  register,
};
