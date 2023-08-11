// Import the required modules and packages
import bcrypt from "bcryptjs";
import connectMongoDB from "@/utils/dbConn";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Connect to the MongoDB database
connectMongoDB();

// Handle the POST request
export async function POST(req: NextRequest) {
  try {
    // Extract email and password from the request body
    const { email, password } = await req.json();

    // Check if either password or email is missing
    if (!password || !email) {
      return NextResponse.json(
        { msg: "All fields are required" }, // Return an error message if any field is missing
        { status: 400 }
      );
    }

    // Find the user in the database using the provided email
    const user = await User.findOne({ email });

    // If the user does not exist, return an error message
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

    // Check if the provided password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return an error message
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

    // Create token data containing user information
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create a token with the token data and the secret key
    const token = await jwt.sign(
      tokenData,
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d", // Token expiration time
        algorithm: "HS256", // Token encryption algorithm
      }
    );

    // Create the response object
    const response = NextResponse.json({
      msg: "Login Successful",
      success: true,
    });

    // Set the token in a HTTP-only cookie for secure storage
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response; // Return the response
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message, // Return an error message if any exception occurs
      },
      {
        status: 500,
      }
    );
  }
}
