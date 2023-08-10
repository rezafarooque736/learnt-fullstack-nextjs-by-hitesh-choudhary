import bcrypt from "bcryptjs";
import connectMongoDB from "@/utils/dbConn";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectMongoDB(); //connect to mongo db database

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!password || !email === undefined) {
      return NextResponse.json(
        { msg: "All fileds are required" },
        { status: 400 }
      );
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }

    // check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token and send it to the client
    const token = await jwt.sign(
      tokenData,
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
        algorithm: "HS256",
      }
    );

    const response = NextResponse.json({
      msg: "Login Successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
