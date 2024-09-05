'use client'

//components
import { ThemeToggle } from "@/components/theme-toggle"

//hooks
import Signin from "./signin";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
    const session = useSession();

    return (
        <header className='p-4'>
            <div className='flex justify-between max-w-7xl m-auto'>
                <div className="flex-container items-end justify-center">
                    <Link href='/'
                        className='text-3xl font-bold text-primary dark:text-purple-400'>
                        Home
                    </Link>
                </div>
                <div className='flex items-center gap-4'>
                    {session?.data &&
                        <Link
                            href='/settings/winners'
                            className='text-primary dark:text-purple-400 hover:underline'
                        >
                            Winners
                        </Link>
                    }
                    <ThemeToggle />
                    <Signin />
                </div>
            </div>
        </header>
    )
}