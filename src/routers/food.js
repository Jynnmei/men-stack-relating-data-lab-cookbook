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

router.post("/foods", checkFoodInput, checkErros, auth, addUserNewFood);
router.get(
  "/foods/:userId",
  validateUserIdParam,
  checkErros,
  auth,
  getUserFood
);

router.delete(
  "/foods/:userId",
  validateUserIdParam,
  checkFoodInput,
  checkErros,
  auth,
  deleteUserFood
);

router.put(
  "/foods/:itemId",
  validateItemIdParam,
  checkFoodInput,
  checkErros,
  auth,
  putFood
);

router.get("/", auth, getAllUsers);

router.get("/:userId", validateUserIdParam, checkErros, auth, getUserPantry);

export default router;
