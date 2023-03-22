import SignIn from "@/components/SignIn/SignIn";
import { getUserSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const loggedIn = await getUserSession();

  if (loggedIn) {
    redirect("/");
  }
  return (
    <div>
      <SignIn mode={"register"} />
    </div>
  );
};

export default RegisterPage;
