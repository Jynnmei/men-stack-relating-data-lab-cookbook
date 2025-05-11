import { body, param } from "express-validator";

export const validateUserIdParam = [
  param("userId", "userId is invalid").isMongoId(),
];

export const validateItemIdParam = [
  param("itemId", "itemId is invalid").isMongoId(),
];

export const checkFoodInput = [
  body("name", "type is required").not().isEmpty(),
];
