// import dbConnect from "../../lib/mongodb";
// import Post from "../../models/ScheduledPost";
// import Group from "../../models/Group";
// import { scheduleFacebookPost } from "../../lib/social/facebook"; // similarly add for others

// export default async function handler(req, res) {
//   const { groupId, message, scheduledAt } = req.body;

//   await dbConnect();

//   const group = await Group.findById(groupId).populate("socialAccounts");

//   const post = new Post({
//     group: groupId,
//     platform: group.socialAccounts[0].platform, // Example for now
//     message,
//     scheduledAt,
//   });

//   await post.save();

//   // Schedule the post for Facebook (example)
//   if (group.socialAccounts[0].platform === "facebook") {
//     await scheduleFacebookPost(
//       group.socialAccounts[0].accessToken,
//       group.socialAccounts[0].accountId,
//       message,
//       scheduledAt
//     );
//   }

//   res.status(200).json({ success: true });
// }
