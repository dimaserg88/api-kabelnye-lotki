import { Router } from "express";
import routerUser from "./router-user.js";

const router = new Router();

router.use("/user", routerUser);

export default router;
