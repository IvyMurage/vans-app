import React, { useState } from "react"
import { Form, redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom"
import { loginUser } from "../api"


export function loginLoader({ request }) {
    return new URL(request.url).searchParams.get('message')
}

export async function formAction({ request }) {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        const loggedUser = await loginUser({ email, password })
        if (loggedUser) {
            localStorage.setItem('loggedIn', true)
            return redirect('/host')
        }
    }
    catch (error) {
        return error.message
    }

    return null
}

export default function Login() {
    const message = useLoaderData()
    const errorMessage = useActionData()
    const navigation = useNavigation()

    return (
        <div className="login-container">

            <h1>Sign in to your account</h1>
            {errorMessage && <h2 className='red'>{errorMessage}</h2>}
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
                    style={{ opacity: navigation.state === "submitting" ? 0.2 : 1 }}
                    disabled={navigation.state === "submitting"}
                >
                    Log in
                </button>
            </Form>
        </div>
    )

}