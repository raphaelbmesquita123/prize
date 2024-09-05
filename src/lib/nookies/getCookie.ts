import { parseCookies } from "nookies";

export default function GETCookie(name: string) {
    const data = parseCookies();
    const cookieStore = data[name]
    return cookieStore
}