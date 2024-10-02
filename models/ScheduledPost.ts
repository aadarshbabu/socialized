import mongoose from "mongoose";

const ScheduledPostSchema = new mongoose.Schema({
  content: String,
  scheduledTime: Date,
  platform: String,
  accountId: String, // Reference to social account
  status: { type: String, default: "scheduled" }, // 'scheduled', 'posted', etc.
});

export default mongoose.models.ScheduledPost ||
  mongoose.model("ScheduledPost", ScheduledPostSchema);
