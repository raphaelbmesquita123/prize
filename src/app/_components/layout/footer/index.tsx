import Image from "next/image";
import Link from "next/link";

//todo: change image logo
export default function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-primary/5">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <Image
                                src="https://flowbite.com/docs/images/logo.svg"
                                className="h-8 me-3"
                                width={32}
                                height={32}
                                alt="FlowBite Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link
                                        href="https://www.instagram.com/raphaelbmesquita/"
                                        target="_blank"
                                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                    >
                                        Nextjs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://www.instagram.com/raphaelbmesquita/"
                                        target="_blank"
                                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                    >
                                        Tailwind Css
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link
                                        href="https://github.com/raphaelbmesquita123"
                                        target="_blank"
                                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                    >
                                        Github
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://www.instagram.com/raphaelbmesquita/"
                                        target="_blank"
                                        className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                    >
                                        Instagram
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex mt-4 gap-4 sm:justify-center sm:mt-0">
                        <Link
                            href="https://www.instagram.com/raphaelbmesquita/"
                            target="_blank"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                            <svg
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-4 h-4">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.057 1.97.247 2.423.417a4.92 4.92 0 011.71 1.09 4.92 4.92 0 011.09 1.71c.17.453.36 1.253.417 2.423.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.057 1.17-.247 1.97-.417 2.423a4.92 4.92 0 01-1.09 1.71 4.92 4.92 0 01-1.71 1.09c-.453.17-1.253.36-2.423.417-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.057-1.97-.247-2.423-.417a4.92 4.92 0 01-1.71-1.09 4.92 4.92 0 01-1.09-1.71c-.17-.453-.36-1.253-.417-2.423-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.057-1.17.247-1.97.417-2.423a4.92 4.92 0 011.09-1.71 4.92 4.92 0 011.71-1.09c.453-.17 1.253-.36 2.423-.417C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.732 0 8.332.015 7.053.073 5.78.13 4.796.323 4.057.607a7.078 7.078 0 00-2.57 1.672A7.078 7.078 0 00.573 4.94c-.283.74-.477 1.724-.534 2.997C0 8.332 0 8.732 0 12s.015 3.668.073 4.947c.057 1.273.251 2.257.534 2.997a7.078 7.078 0 001.672 2.57 7.078 7.078 0 002.57 1.672c.74.283 1.724.477 2.997.534C8.332 24 8.732 24 12 24s3.668-.015 4.947-.073c1.273-.057 2.257-.251 2.997-.534a7.078 7.078 0 002.57-1.672 7.078 7.078 0 001.672-2.57c.283-.74.477-1.724.534-2.997.058-1.279.073-1.679.073-4.947s-.015-3.668-.073-4.947c-.057-1.273-.251-2.257-.534-2.997a7.078 7.078 0 00-1.672-2.57 7.078 7.078 0 00-2.57-1.672c-.74-.283-1.724-.477-2.997-.534C15.668 0 15.268 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100-2.882 1.44 1.44 0 000 2.882z" />
                            </svg>

                            <span className="sr-only">Instagram page</span>
                        </Link>

                        <Link
                            href="https://github.com/raphaelbmesquita123"
                            target="_blank"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer >
    )
}