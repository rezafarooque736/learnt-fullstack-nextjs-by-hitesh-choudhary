import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connectMongoDB from "@/utils/dbConn";

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findById(userId).select("-password");
    return NextResponse.json(
      {
        msg: "User Found",
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, msg: "User not found" },
      { status: 400 }
    );
  }
}
