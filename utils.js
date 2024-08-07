import { redirect } from "react-router-dom"

export async function requireAuth() { 
    const isLogged = localStorage.getItem('loggedIn')

    if(!JSON.parse(isLogged)) {
        throw redirect('/login?message=You must log in first.')
    }
}