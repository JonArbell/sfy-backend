import { myAccount } from "../controllers/my-account-controller";
import { Router } from "express";
import { authenticateJWT } from "../middlewares/token-middleware";
const router = Router();
router.get('/me', authenticateJWT, myAccount);
export default router;
