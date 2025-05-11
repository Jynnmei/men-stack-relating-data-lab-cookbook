import express from "express";
import { login, refresh, register } from "../controllers/auth.js";

const router = express.Router();

router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
