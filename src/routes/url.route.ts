import express, { Router } from "express";
import { validateBody } from "../middlewares/body-validator";
import { shortenUrlValidator } from "../dtos/request/shorten-url-request.dto";
import urlController from "../controllers/url-controller";
import { authenticateJWT } from "../middlewares/token-middleware";

const router: Router = express.Router();

const authenticated: Router = express.Router();

authenticated.use(authenticateJWT);

authenticated.get("/", urlController.getAllUrls);

authenticated.post(
  "/",
  validateBody(shortenUrlValidator),
  urlController.shortenUrl,
);

authenticated.get("/:id", urlController.getUrlById);

authenticated.delete("/:id", urlController.deleteUrlById);

router.get("/short/:shortUrl", urlController.getUrlByShort);

router.post("/short/:shortUrl/verify-password", urlController.verifyPassword);

router.use(authenticated);

export default router;
