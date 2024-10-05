import { NextResponse } from "next/server";
import ScheduledPost from "@/models/ScheduledPost";
import { connectToDatabase } from "@/lib/mongodb";
// import {
//   scheduleFacebookPost,
//   scheduleInstagramPost,
//   scheduleLinkedInPost,
//   scheduleTwitterPost,
// } from "@/lib/socialMediaApis";

export async function POST(req: Request) {
  const { content, scheduledTime, platform, accountId } = await req.json();
  await connectToDatabase();

  const newPost = new ScheduledPost({
    content,
    scheduledTime,
    platform,
    accountId,
  });
  // await newPost.save();
  //
  //   // Call the appropriate API based on the platform
  //   if (platform === "facebook") {
  //     await scheduleFacebookPost(accountId, content, scheduledTime);
  //   } else if (platform === "instagram") {
  //     await scheduleInstagramPost(accountId, content, scheduledTime);
  //   } else if (platform === "linkedin") {
  //     await scheduleLinkedInPost(accountId, content, scheduledTime);
  //   } else if (platform === "twitter") {
  //     await scheduleTwitterPost(accountId, content, scheduledTime);
  //   }

  return NextResponse.json({ success: true });
}
