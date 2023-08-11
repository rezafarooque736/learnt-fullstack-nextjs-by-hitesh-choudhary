import bcrypt from "bcryptjs";
import connectMongoDB from "@/utils/dbConn";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectMongoDB(); //connect to mongo db database

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !password || !email) {
      return NextResponse.json(
        { msg: "All fileds are required" },
        { status: 400 }
      );
    }

    // check if user is exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const savedUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { msg: "User Created Successfully", success: true, savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
