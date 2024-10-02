import mongoose from "mongoose";

const SocialAccountSchema = new mongoose.Schema({
  platform: String, // Facebook, Instagram, LinkedIn, etc.
  accessToken: String,
  userId: String, // Platform-specific user ID
});

const ProductGroupSchema = new mongoose.Schema({
  name: String,
  ownerId: String, // Clerk User ID
  socialAccounts: [SocialAccountSchema],
});

export default mongoose.models.ProductGroup ||
  mongoose.model("ProductGroup", ProductGroupSchema);
