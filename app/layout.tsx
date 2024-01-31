"use client";
import { GlobalStyle } from "./styles/global";
import StyledComponentsRegistry from "./lib/registry";
import { ThemeProvider } from "@contexts/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <StyledComponentsRegistry>
            {children}
            <GlobalStyle />
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
