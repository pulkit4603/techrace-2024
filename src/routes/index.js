import express from "express";
import { logout } from "../controllers";
import LoginRoutes from "./login-routes.js";
import UserRoutes from "./user-routes.js";
import VolunteerRoutes from "./volunteer-routes.js";
import GameRoutes from "./game-routes.js";
import auth from "../middleware";

const router = express.Router();

router.use("/login", LoginRoutes);
router.use("/users", UserRoutes);
router.use("/volunteer", VolunteerRoutes);
router.use("/game", GameRoutes);

router.post("../logout", auth, logout);

export default router;
