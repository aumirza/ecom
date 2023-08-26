// import { Inter } from "next/font/google";
import Providers from "@/components/Providers";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Ecom",
//   description: "Your ecommerce store",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        //className={inter.className}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
