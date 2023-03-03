import Image from "next/image";
import bg from "../../../public/cocktail.jpg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="flex items-center justify-center w-full h-screen bg-black bg-opacity-30">
          <Image
            // contain
            className="absolute w-full h-full -z-20"
            src={bg}
            alt={"login"}
          ></Image>
          {children}
        </div>
      </body>
    </html>
  );
};

export default AuthLayout;
