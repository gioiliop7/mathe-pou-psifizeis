import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Μάθε που ψηφίζεις map",
  description:
    "Δημιούργησε το δικό σου χάρτη εκλογικών κέντρων για εσένα και όσους ακόμα θέλεις!",
  authors: [{ name: "Giorgos Iliopoulos" }],
  openGraph: {
    images:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Μάθε που ψηφίζεις map",
    description: "The React Framework for the Web",
    siteName: "Μάθε που ψηφίζεις map",
    url: "https://mathe-pou-psifizeis.vercel.app/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Μάθε που ψηφίζεις map",
    description:
      "Δημιούργησε το δικό σου χάρτη εκλογικών κέντρων για εσένα και όσους ακόμα θέλεις!",
    creator: "@gioiliop",
    images: [
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
