import { ReactNode } from "react";
import Navbar from "../../components/NavBar/Navbar";
import "../globals.css";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main className="flex flex-col w-full h-full min-h-screen bg-dDarkGreen">
          <Navbar />

          <div className="h-full mt-16">{children}</div>
        </main>
      </body>
    </html>
  );
}
