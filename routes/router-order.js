import { Router } from "express";
import OrderController from "../controllers/OrderController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import RoleMiddleware from "../middlewares/RoleMiddleware.js";

const router = new Router();

router.get("/", OrderController.getOrders);
router.post("/", OrderController.createOrder);

export default router;
