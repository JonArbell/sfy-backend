import express, { Router } from "express";
import dashboardController from "../controllers/dashboard-controller";
import { authenticateJWT } from "../middlewares/token-middleware";

const router: Router = express.Router();
router.use(authenticateJWT);

router.get("/summary", dashboardController.getSummary);

router.get("/charts", dashboardController.getCharts);

router.get("/recent-urls", dashboardController.getRecentUrls);

export default router;
