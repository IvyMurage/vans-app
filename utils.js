import { redirect } from "react-router-dom"

export async function requireAuth(request) { 
    const isLogged = localStorage.getItem('loggedIn')
    const pathname = new URL(request.url).pathname
    console.log(pathname)
    if(!JSON.parse(isLogged)) {
        throw redirect(`/login?redirectTo=${pathname}`)
    }
}