import Image from "next/image";
import "@/styles/global.css";
import banner from "@/assets/images/banner.svg";
import Providers from "@/utils/provider";
import Link from "next/link";

export const metadata = {
  title: "Rick and Morty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-1 flex-col items-center justify-start px-2 pb-10 pt-8 sm:px-8 sm:py-5">
          <Link href="/">
            <Image
              src={banner}
              alt="banner image"
              className="max-w-[300px] mb-8"
            />
          </Link>
          <div className="w-11/12 bg-bgColor shadow-xl border-primary border-2 px-2 py-3 md:w-[680px]">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
