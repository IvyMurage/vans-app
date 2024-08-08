import React, { Suspense } from "react"
import { Await, defer, Link, useActionData, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"


export async function loader({ request }) {
    await requireAuth(request)
    return defer({ hostVans: getHostVans() })
}
export default function HostVans() {
    const vans = useLoaderData()


    function renderHostVans(vans) {

        const hostVansEls = vans.map(van => (
            <Link
                to={van.id}
                key={van.id}
                className="host-van-link-wrapper"
            >
                <div className="host-van-single" key={van.id}>
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                </div>
            </Link>
        ))

        return hostVansEls
    }

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">

                <section>
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Await resolve={vans.hostVans}>
                            {(vans) => renderHostVans(vans)}
                        </Await>
                    </Suspense>
                </section>

            </div>
        </section>
    )
}