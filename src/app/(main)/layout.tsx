import { ReactNode } from "react";
import Navbar from "../../components/NavBar/Navbar";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <main className="flex flex-col w-full h-full min-h-screen bg-dDarkGreen">
      <Navbar />

      <div className="h-full mt-16">{children}</div>
    </main>
  );
}
