import { validationResult } from "express-validator";

export const checkErros = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ errors: erros.array() });
  } else {
    next();
  }
};
