import mongoose from "mongoose";
import { ProductGroupSchema } from "./ProductGroup";
import { SocialAccountSchema } from "./SocialAccountSchema";

// User Schema - Main user model, includes references to groups and social accounts
export const UserSchema = new mongoose.Schema({
  clerkUserId: String, // Clerk's user ID for identification
  email: String, // User's email
  name: String, // User's name (if needed)
  socialAccounts: [SocialAccountSchema], // User's standalone social accounts not attached to groups
  groups: [ProductGroupSchema], // Array of groups created by the user
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
