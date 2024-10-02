import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  accessTokens: [
    {
      platform: String, // e.g., 'facebook', 'instagram', 'linkedin', 'twitter'
      token: String,
      expires: Date,
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
