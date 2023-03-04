import Image from "next/image";
import bg from "../../../public/cocktail.jpg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-black bg-opacity-30">
      <Image
        // contain
        className="absolute w-full h-full -z-20"
        src={bg}
        alt={"login"}
      ></Image>
      {children}
    </div>
  );
};

export default AuthLayout;
