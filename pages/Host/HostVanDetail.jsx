import React, { Suspense } from "react"
import { Await, defer, Link, NavLink, Outlet, useActionData, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"


export async function loader({ request, params }) {
    await requireAuth(request)
    return defer({ vanHost: getHostVans(params.id) })
}
export default function HostVanDetail() {
    const currentVanPromise = useLoaderData()
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }


    function renderHostVan(currentVan) {
        return (
            <>
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Details
                    </NavLink>
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Pricing
                    </NavLink>
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Photos
                    </NavLink>
                </nav>
                <Outlet context={{ currentVan }} />
            </>
        )
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            <div className="host-van-detail-layout-container">
                <Suspense fallback={<h2>Loading...</h2>}>
                    <Await resolve={currentVanPromise.vanHost}>
                        {(van) => renderHostVan(van)}
                    </Await>
                </Suspense>
            </div>
        </section>
    )
}
