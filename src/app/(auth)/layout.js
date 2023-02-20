import "../globals.css";
import Image from "next/image";
import bg from "../../../public/cocktail.jpg";

const AuthLayout = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="flex items-center justify-center w-full h-screen bg-black bg-opacity-20">
          <Image
            // contain
            fill
            className="absolute -z-20"
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
