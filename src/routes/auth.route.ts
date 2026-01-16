import express, { Router } from "express";
import authController from "../controllers/auth-controller";

const router: Router = express.Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/refresh", authController.refreshToken);

export default router;
