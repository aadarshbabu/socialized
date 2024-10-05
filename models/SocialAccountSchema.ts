import mongoose from "mongoose";

export const SocialAccountSchema = new mongoose.Schema({
  platform: String, // Facebook, Instagram, LinkedIn, etc.
  accessToken: String,
  accountId: String, // Platform-specific user ID
  picture: String,
  email: String,
  jti: { type: String, default: null },
  iat: Number,
  exp: Number,
});

export default mongoose.models.SocialAccountSchema ||
  mongoose.model("SocialAccountSchema", SocialAccountSchema);
