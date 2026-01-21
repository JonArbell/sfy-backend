import express, { Router } from "express";
import urlRoutes from "./url.route";
import authRoutes from "./auth.route";
import myAccountRoutes from "./my-account.route";
import userRepository from "../repositories/user-repository";
import visitorRoutes from "./visitor.route";
import dashboardRoutes from "./dashboard.route";

const api: Router = express.Router();

const router: Router = express.Router();

api.use("/api", router);

router.use(authRoutes);
router.use("/me", myAccountRoutes);

router.use("/urls", urlRoutes);

router.use("/visitors", visitorRoutes);

router.use("/dashboard", dashboardRoutes);

router.delete("/delete", async (req, res, next) => {
  userRepository.deleteAll();

  res.json({ message: "All users deleted" });
});

router.get("/", (req, res) => {
  res.status(200).json({
    message: "try",
  });
});

export default api;
