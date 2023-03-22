import SignIn from "@/components/SignIn/SignIn";
import { getUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const loggedIn = await getUserSession();

  if (loggedIn) {
    redirect("/");
  }

  return (
    <div>
      <SignIn mode={"signin"} />
    </div>
  );
};

export default SignInPage;
