import { Router } from "express";
import UserController from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import RoleMiddleware from "../middlewares/RoleMiddleware.js";

const router = new Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", AuthMiddleware, UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.post("/update-profile", AuthMiddleware, UserController.updateProfile);
router.get("/current", AuthMiddleware, UserController.current);
router.get(
  "/all",
  AuthMiddleware,
  RoleMiddleware(["ADMIN", "USER"]),
  UserController.all
);

export default router;
