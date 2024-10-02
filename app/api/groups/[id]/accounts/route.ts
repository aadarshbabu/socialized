import { NextResponse } from "next/server";
import ProductGroup from "@/models/ProductGroup";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  const { groupId, socialAccount } = await req.json();

  await connectToDatabase();

  // Find the group and update the social accounts
  const group = await ProductGroup.findById(groupId);
  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  group.socialAccounts.push(socialAccount); // Add the new social account
  await group.save();

  return NextResponse.json({ group });
}
