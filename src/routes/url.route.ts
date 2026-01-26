import express, { Router } from "express";
import { validateBody } from "../middlewares/body-validator";
import { shortenUrlValidator } from "../dtos/request/shorten-url-request.dto";
import urlController from "../controllers/url-controller";
import { authenticateJWT } from "../middlewares/token-middleware";

const router: Router = express.Router();

router.post("/short/:shortUrl/verify-password", urlController.verifyPassword);

router.get("/:shortUrl", urlController.getUrlByShort);

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

authenticated.put(
  "/:id",
  validateBody(shortenUrlValidator),
  urlController.updateUrlById,
);

router.use("/api/urls", authenticated);

export default router;
