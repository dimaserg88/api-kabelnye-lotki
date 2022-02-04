import { Router } from "express";
import CatalogController from "../controllers/CatalogController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import RoleMiddleware from "../middlewares/RoleMiddleware.js";

const router = new Router();

router.get("/", CatalogController.getCatalog);

export default router;
