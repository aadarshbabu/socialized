// utils/getClerkUserId.js
import { getAuth } from "@clerk/nextjs/server";

export const getClerkUserId = async (req) => {
  try {
    const { userId } = getAuth(req); // Extract the user ID from the Clerk session

    if (!userId) {
      throw new Error("No Clerk user ID found");
    }

    return userId; // This is the Clerk User ID (clerkUserId)
  } catch (error) {
    console.error("Error getting Clerk user ID:", error);
    throw new Error("Unable to retrieve Clerk user ID");
  }
};
