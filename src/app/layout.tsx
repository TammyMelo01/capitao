import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capitão",
  description: "Assistente inteligente de estudos para concursos policiais"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
