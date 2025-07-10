import {cookies} from 'next/headers'

export async function getCookieServer(){

    const cookie = await cookies()
    const token = cookie.get("session")?.value;

    return token || null;
}