import visitorController from "../controllers/visitor-controller";
import express, { Router } from "express";
import { authenticateJWT } from "../middlewares/token-middleware";

const router: Router = express.Router();

router.get("/", authenticateJWT, visitorController.getAllVisitors);

router.get(
  "/visitors/unique/count",
  authenticateJWT,
  visitorController.getAllVisitors,
);

export default router;
