// Import the required modules and packages
import { NextResponse } from "next/server";

// Function to handle GET request
export async function GET() {
  try {
    // Create a response object with success message and status
    const response = NextResponse.json({
      msg: "Logout Successfully",
      success: true,
    });

    // Set the "token" cookie to an empty value and configure it with options
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    // Return the response
    return response;
  } catch (error: any) {
    // If an error occurs, return a JSON response with the error message and a status of 500
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
