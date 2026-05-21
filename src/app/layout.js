import { Toaster } from "react-hot-toast";
import "./globals.css";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Emma Dev",
  description: "Emmanuel Gaviria es un desarrollador full stack.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Script
        strategy="lazyOnload"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NRS9PX9R2K"
      ></Script>
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-NRS9PX9R2K');
        `}
      </Script>
      <SmoothScroll />
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
