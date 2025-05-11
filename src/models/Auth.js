import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    hash: { type: String, require: true },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "auth" }
);

export default mongoose.model("Auth", AuthSchema);
