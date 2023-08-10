"use client";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const styleLabel = "block text-2xl capitalize text-slate-700";
const styleContactFormInput =
  "block w-full px-4 py-3 mt-2 border-none rounded-md shadow-md outline-none shadow-slate-100";
export default function SignupPage() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("Signup successful: " + res.data);
      toast.success("User signed up successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed: " + error.message);
      toast.error("Signup failed: ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <form
        onSubmit={handleSignup}
        className="p-12 min-w-[32rem] max-w-[48rem] shadow-lg shadow-slate-300/50 rounded-xl text-left"
      >
        <h2 className="block my-4 text-3xl font-bold text-center uppercase text-slate-700">
          {loading ? "Processing" : "Signup"}
        </h2>
        <div className="mb-2">
          <label htmlFor="username" className={styleLabel}>
            Enter your Name
            <input
              className={styleContactFormInput}
              type="text"
              name="username"
              placeholder="Enter your Name"
              value={user.username}
              onChange={handleChange}
              autoComplete={"off"}
              required
            />
          </label>
        </div>

        <div className="mb-2">
          <label htmlFor="email" className={styleLabel}>
            Enter your Email
            <input
              className={styleContactFormInput}
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={user.email}
              onChange={handleChange}
              autoComplete={"off"}
              required
            />
          </label>
        </div>

        <div className="mb-2">
          <label htmlFor="password" className={styleLabel}>
            Enter your Password
            <input
              className={styleContactFormInput}
              type="text"
              name="password"
              placeholder="Enter your Password"
              value={user.password}
              onChange={handleChange}
              autoComplete={"off"}
              required
            />
          </label>
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            disabled={buttonDisabled}
            className="p-2 px-12 my-4 text-lg text-white border border-slate-300 rounded-xl focus:outline-none focus:border-slate-600 bg-slate-500 hover:bg-white hover:text-slate-700 disabled:bg-slate-300 disabled:text-white"
          >
            Signup
          </button>
        </div>
        <div className="flex justify-end w-full">
          <Link href={"/login"}>Visit Login Page</Link>
        </div>
      </form>
    </div>
  );
}
