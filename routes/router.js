import { Router } from "express";
import routerUser from "./router-user.js";
import routerCatalog from "./router-catalog.js";
import routerOrder from "./router-order.js";

const router = new Router();

router.use("/user", routerUser);
router.use("/catalog", routerCatalog);
router.use("/order", routerOrder);

export default router;
