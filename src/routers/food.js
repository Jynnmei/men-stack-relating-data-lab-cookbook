import express from "express";
import {
  addUserNewFood,
  deleteUserFood,
  getAllFood,
  getAllUsers,
  getUserFood,
  getUserPantry,
  putFood,
  seedUserFood,
} from "../controllers/food.js";
import { auth } from "../middleware/is-signed-in.js";

const router = express.Router();

router.get("/foods/seed", seedUserFood);
router.get("/foods", auth, getAllFood);
router.post("/foods", auth, addUserNewFood);
router.get("/foods/:userId", auth, getUserFood);
router.delete("/foods/:userId", auth, deleteUserFood);
router.put("/foods/:itemId", auth, putFood);
router.get("/", auth, getAllUsers);
router.get("/:userId", auth, getUserPantry);

export default router;
