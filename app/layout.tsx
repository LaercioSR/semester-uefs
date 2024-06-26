import { LayoutProps } from ".next/types/app/layout";
import StyledComponentsRegistry from "./lib/registry";
import { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Semestre UEFS",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt">
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
