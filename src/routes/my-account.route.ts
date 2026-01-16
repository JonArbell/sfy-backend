import { myAccount } from "../controllers/my-account-controller";
import express, { Router } from "express";
import { authenticateJWT } from "../middlewares/token-middleware";

const router: Router = express.Router();

router.get("/me", authenticateJWT, myAccount);

export default router;
