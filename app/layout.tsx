import type { Metadata } from "next"; import "./globals.css"; import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer"; import Providers from "@/components/Providers";
export const metadata:Metadata={title:"বাজার দর — আজকের বাজারদর",description:"নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে জানুন।"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn"><body><Providers/><Navbar/><main>{children}</main><Footer/></body></html>}
