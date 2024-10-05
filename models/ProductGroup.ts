import mongoose from "mongoose";
import { SocialAccountSchema } from "./SocialAccountSchema";

export const ProductGroupSchema = new mongoose.Schema({
  name: String,
  ownerId: String,
  socialAccounts: [SocialAccountSchema], // Each group can have multiple social accounts
});

export default mongoose.models.ProductGroupSchema ||
  mongoose.model("ProductGroupSchema", ProductGroupSchema);
