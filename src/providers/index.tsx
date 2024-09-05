'use client'
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "react-hot-toast";


export default function AppProvider({ children, ...props }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider {...props}>
                {children}
                <Toaster />
            </ThemeProvider>
        </SessionProvider>
    )
}