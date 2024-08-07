import React, { useState } from "react"
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { loginUser } from "../api"


export function loginLoader({ request }) {
    return new URL(request.url).searchParams.get('message')
}

export async function formAction({ request }) {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    const loggedUser = await loginUser({ email, password })
    if (loggedUser) {
        localStorage.setItem('loggedIn', true)
        return redirect('/host')
    }
    return null
}

export default function Login() {
    const message = useLoaderData()
    const [status, setStatus] = useState("idle")
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    function handleSubmit(e) {
        e.preventDefault()
        const login = async () => {
            nSubmit = { handleSubmit }
            setStatus("submitting")
            try {
                const data = await loginUser(loginFormData)
                setError(null)
                console.log(data)
                navigate('/host', { replace: true })

            }
            catch (error) {
                setError(error.message)
                console.log("error")
            }
            finally {
                setStatus("idle")
            }
        }

        login()

    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    console.log(status)
    return (
        <div className="login-container">

            <h1>Sign in to your account</h1>
            {error && <h2 className='red'>{error}</h2>}
            {message && <h2 className='red'>{message}</h2>}
            <Form method='POST' className="login-form" replace>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button
                    style={{ opacity: status === "submitting" ? 0.2 : 1 }}
                    disabled={status === "submitting"}
                >
                    Log in
                </button>
            </Form>
        </div>
    )

}