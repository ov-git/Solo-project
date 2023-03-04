"use client";

import { FcGoogle } from "react-icons/fc";
import RegisterForm from "./RegisterForm";
import SignInForm from "./SignInForm";

type Props = {
  mode: "signin" | "register";
};

const SignIn = ({ mode }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center py-4 text-5xl font-bold text-white">
        <h1>{mode === "signin" ? "Welcome back!" : "Welcome"}</h1>
      </div>
      {mode === "signin" ? <SignInForm /> : <RegisterForm />}
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
