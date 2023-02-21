"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { registerUser } from "../lib/ApiService";

type Props = {
  mode: "signin" | "register";
};

const SignIn = ({ mode }: Props) => {
  const path = usePathname();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      email: form.email,
      password: form.password,
    };
    registerUser(path, user);
  };

  return (
    <>
      <div className="flex items-center justify-center py-8 text-5xl font-bold text-white">
        <h1>{mode === "signin" ? "Welcome back!" : "Welcome"}</h1>
      </div>
      <form
        className="flex flex-col gap-4 p-12 font-bold bg-gray-500 border border-red-900 rounded"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label>Email</label>
        <input
          placeholder={"example@mail.com"}
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
        <button type="submit" className="bg-white rounded">
          Submit
        </button>
        {/* <button
        type="button"
        className="flex items-center justify-center w-full bg-white"
        onClick={() => googleLogin()}
      >
        Sign in with Google{" "}
        <FcGoogle className="ml-4 text-3xl bg-white rounded-full" />
      </button> */}
        {mode === "signin" ? (
          <Link href="/register">New User?</Link>
        ) : (
          <Link href="/signin">Already have an account?</Link>
        )}
      </form>
    </>
  );
};

export default SignIn;
