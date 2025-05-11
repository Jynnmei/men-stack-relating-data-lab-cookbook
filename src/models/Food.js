import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  { collection: "food" }
);

export default FoodSchema;
