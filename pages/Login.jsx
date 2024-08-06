import React, { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { loginUser } from "../api"


export function loginLoader({ request }) {
    return new URL(request.url).searchParams.get('message')
}
export default function Login() {
    const message = useLoaderData()
    const [status, setStatus] = useState("idle")
    const [error, setError] = useState(null)
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })

    function handleSubmit(e) {
        e.preventDefault()
        const login = async () => {
            setStatus("submitting")
            try {
                const data = await loginUser(loginFormData)
                setError(null)
                console.log(data)
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
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button
                    style={{ opacity: status === "submitting" ? 0.2 : 1 }}
                    disabled={status === "submitting"}
                >Log in</button>
            </form>
        </div>
    )

}