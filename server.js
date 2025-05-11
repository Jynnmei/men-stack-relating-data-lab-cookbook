import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/db/db.js";
import userFoodRoutes from "./src/routers/food.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import auth from "./src/routers/auth.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();
const app = express();
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userFoodRoutes);
app.use("/auth", auth);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res
      .status(400)
      .send({ status: "error", msg: "an error has occurred" });
  }

  next();
});

app.listen(process.env.PORT);

export default app;
