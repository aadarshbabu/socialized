import { NextResponse } from "next/server";
import ProductGroup from "@/models/ProductGroup";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  const { name, socialAccounts, ownerId } = await req.json();

  await connectToDatabase();

  const newGroup = new ProductGroup({ name, socialAccounts, ownerId });
  await newGroup.save();

  return NextResponse.json({ group: newGroup });
}

export async function GET(req: Request) {
  // const { name, socialAccounts, ownerId } = await req.json();

  await connectToDatabase();

  const groups = await ProductGroup.find({});

  return NextResponse.json({ groups });
}
