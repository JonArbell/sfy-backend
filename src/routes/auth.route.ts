import express, { Router } from "express";
import authController from "../controllers/auth-controller";
import { validateBody } from "../middlewares/body-validator";
import { registerValidator } from "../dtos/request/register-request.dto";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GoogleOAuthProfileRequestDTO } from "../dtos/request/google-auth-request.dto";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const googleProfile = profile as GoogleOAuthProfileRequestDTO;

      const findUser =
        await authController.loginOrCreateGoogleAccount(googleProfile);

      return done(null, findUser);
    },
  ),
);

const router: Router = express.Router();

router.post("/login", authController.login);

router.get(
  "/google/auth",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/auth/callback",
  passport.authenticate("google", { session: false }),
  authController.handleRedirectGoogle,
);

router.post(
  "/register",
  validateBody(registerValidator),
  authController.register,
);

router.post("/forgot-password", authController.preparingForgotPassword);

router.post("/refresh", authController.refreshToken);

export default router;
