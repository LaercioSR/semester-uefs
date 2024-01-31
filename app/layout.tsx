import StyledComponentsRegistry from "./lib/registry";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Semestre UEFS",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
