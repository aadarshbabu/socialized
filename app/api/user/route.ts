import { NextResponse } from "next/server";
import ProductGroup from "@/models/ProductGroup";
import { connectToDatabase } from "@/lib/mongodb";
import { useAuth } from "@clerk/nextjs";
import User from "@/models/User";
import SocialAccountSchema from "@/models/SocialAccountSchema";

export async function POST(req: Request) {
  const { clerkId, accountId, email, name } = await req.json();

  await connectToDatabase();

  const SocialAccountDetails = await SocialAccountSchema.findOne({
    accountId: accountId,
  });

  if (!SocialAccountDetails) {
    return NextResponse.json({ error: "Account not found", status: 402 });
  }

  const currentUser = await User.findOne({ clerkUserId: clerkId });

  if (!currentUser) {
    const u = new User({
      name: name,
      email,
      clerkUserId: clerkId,
      socialAccounts: SocialAccountDetails,
    });
    u.save();
  } else {
    const exists = currentUser.socialAccounts.some(
      (account: { accountId: any }) => account.accountId === accountId
    );
    console.log("exist", exists);
    if (!exists) {
      currentUser.socialAccounts.push(SocialAccountDetails);
    }
  }

  console.log("u", clerkId, accountId, email, name);

  return NextResponse.json({
    clerkId,
    message: "account linked",
    success: true,
  });
}
