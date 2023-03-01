"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { registerUser } from "../../lib/ApiService";

type Props = {
  mode: "signin" | "register";
};

const SignIn = ({ mode }: Props) => {
  const path = usePathname();
  const router = useRouter();

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
    const resp = await registerUser(path, user);
    if (resp) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center py-4 text-5xl font-bold text-white">
        <h1>{mode === "signin" ? "Welcome back!" : "Welcome"}</h1>
      </div>
      <form
        className="flex flex-col gap-6 p-12 font-semibold text-white bg-gray-800 bg-opacity-50 border border-red-900 rounded w-80"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="text-black"
          placeholder=" Username or Email..."
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <input
          className="text-black"
          placeholder=" Password..."
          type="password"
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
        <button type="submit" className="p-1 rounded bg-dLightGreen ">
          {mode === "signin" ? "Login" : "Register"}
        </button>

        {mode === "signin" ? (
          <Link className="underline underline-offset-2" href="/register">
            New User?
          </Link>
        ) : (
          <Link className="underline underline-offset-2" href="/signin">
            Already have an account?
          </Link>
        )}
      </form>
    </div>
  );
};

{
  /* <button
        type="button"
        className="flex items-center justify-center w-full bg-white"
        onClick={() => googleLogin()}
      >
        Sign in with Google{" "}
        <FcGoogle className="ml-4 text-3xl bg-white rounded-full" />
      </button> */
}

export default SignIn;
