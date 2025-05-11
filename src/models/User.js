import mongoose from "mongoose";
import FoodSchema from "./Food.js";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true },
    pantry: [FoodSchema],
  },
  { collection: "user" }
);

export default mongoose.model("User", UserSchema);
