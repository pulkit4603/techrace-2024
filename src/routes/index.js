import express from "express";

import LoginRoutes from "./login-routes.js";
import UserRoutes from "./user-routes.js";
import VolunteerRoutes from "./volunteer-routes.js";
import GameRoutes from "./game-routes.js";

const router = express.Router();

router.use("/login", LoginRoutes);
router.use("/users", UserRoutes);
router.use("/volunteer", VolunteerRoutes);
router.use("/game", GameRoutes);

export default router;
