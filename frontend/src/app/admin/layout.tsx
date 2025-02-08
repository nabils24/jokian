// app/dashboard/layout.tsx
import { ReactNode } from "react";
import Sidebar from "@/components/SidebarLayout/sidebarlayout";

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body className="relative">
                {/* Sidebar berada di latar belakang */}
                <Sidebar />
                {/* Konten utama: gunakan margin kiri pada layar besar */}
                <main className="relative z-10  transition-all duration-300 ml-0 lg:ml-[300px] ">
                    {children}
                </main>
            </body>
        </html>
    );
}
