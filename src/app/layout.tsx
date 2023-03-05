import { Metadata } from "next/types";
import { ReactNode } from "react";
import "./globals.css";
import Providers from "./providers";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Drinkzz",
  description: "Main page",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
