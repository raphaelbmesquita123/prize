'use server'
//components
import Footer from "./footer";
import Header from "./header";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className='min-h-screen'>
                {children}
            </div>
            <Footer />
        </>
    )
}