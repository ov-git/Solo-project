import { getUserSession } from "@/lib/auth";
import Profile from "../../../../components/Profile/Profile";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const loggedIn = await getUserSession();

  if (!loggedIn) {
    redirect("/");
  }

  //@ts-ignore
  return <Profile />;
};

export default ProfilePage;
