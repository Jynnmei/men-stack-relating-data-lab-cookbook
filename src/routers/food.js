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
import {
  checkFoodInput,
  validateItemIdParam,
  validateUserIdParam,
} from "../validators/food.js";
import { checkErros } from "../validators/checkErrors.js";

const router = express.Router();

router.get("/foods/seed", seedUserFood);

router.get("/foods", auth, getAllFood);

router.post("/foods", auth, checkFoodInput, checkErros, addUserNewFood);
router.get(
  "/foods/:userId",
  auth,
  validateUserIdParam,
  checkErros,
  getUserFood
);

router.delete(
  "/foods/:userId",
  auth,
  validateUserIdParam,
  checkFoodInput,
  checkErros,
  deleteUserFood
);

router.put(
  "/foods/:itemId",
  auth,
  validateItemIdParam,
  checkFoodInput,
  checkErros,
  putFood
);

router.get("/", auth, getAllUsers);

router.get("/:userId", auth, validateUserIdParam, checkErros, getUserPantry);

export default router;
