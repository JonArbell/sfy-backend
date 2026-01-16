import visitorController from "../controllers/visitor-controller";
import { Router } from "express";
import { authenticateJWT } from "../middlewares/token-middleware";
const router = Router();
router.get('/', authenticateJWT, visitorController.getAllVisitors);
export default router;
