import express, { Router } from "express";
import authController from "../controllers/auth-controller";
import { validateBody } from "../middlewares/body-validator";
import { registerValidator } from "../dtos/request/register-request.dto";

const router: Router = express.Router();

router.post("/login", authController.login);

router.post(
  "/register",
  validateBody(registerValidator),
  authController.register,
);

router.post("/refresh", authController.refreshToken);

export default router;
