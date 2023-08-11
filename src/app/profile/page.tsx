"use client";

// Import required modules
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define the ProfilePage component
export default function ProfilePage() {
  // Initialize the router
  const router = useRouter();

  const [data, setData] = useState("nothing");

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");

      // Redirect to the login page
      router.push("/login");
    } catch (error: any) {
      toast.error("Error logging out");
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.user._id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col py-2">
      {/* Display toast notifications */}
      <ToastContainer />

      <h2>Profile</h2>
      <hr />
      <p>Profile page</p>
      <h2 className="p-2 rounded bg-green-500 text-white font-bold my-3">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      {/* Button to logout */}
      <button
        onClick={handleLogout}
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        type="button"
        className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
      >
        Get User Details
      </button>
    </div>
  );
}
