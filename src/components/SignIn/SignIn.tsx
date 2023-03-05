"use client";

import { signIn } from "next-auth/react";
import RegisterForm from "./RegisterForm";
import SignInForm from "./SignInForm";

type Props = {
  mode: "signin" | "register";
};

const SignIn = ({ mode }: Props) => {
  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center py-4 text-5xl font-bold text-white">
        <h1>{mode === "signin" ? "Welcome back!" : "Welcome"}</h1>
      </div>
      {mode === "signin" ? (
        <SignInForm handleGoogleLogin={handleGoogleLogin} />
      ) : (
        <RegisterForm handleGoogleLogin={handleGoogleLogin} />
      )}
    </div>
  );
};

export default SignIn;
