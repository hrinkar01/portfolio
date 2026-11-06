import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

export const metadata: Metadata = {
  title: "Hrinkar Bothra",
  description: "Hrinkar Bothra - Software Engineer, SIH '25 Winner, OWASP BLT Contributor.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
