import myAccountController from "../controllers/my-account-controller";
import express, { Router } from "express";
import { authenticateJWT } from "../middlewares/token-middleware";
import { validateBody } from "../middlewares/body-validator";
import { updateCredentialsValidator } from "../dtos/request/user-request.dto";
import { userProfileValidator } from "../dtos/request/user-profile-request.dto";

const router: Router = express.Router();

router.use(authenticateJWT);

router.get("/", myAccountController.getMyAccount);

// router.patch("/", authenticateJWT, myAccountController.updateMyAccount);

router.put(
  "/credentials",
  validateBody(updateCredentialsValidator),
  myAccountController.updateCredentials,
);

router.put(
  "/profile",
  validateBody(userProfileValidator),
  myAccountController.updateUserProfile,
);

export default router;
