import React, { Suspense } from "react"
import { Link, useLocation, useLoaderData, defer, Await, useActionData } from "react-router-dom"
import { getVans } from "../../api"

export function loader({ params }) {
    return defer({ van: getVans(params.id) })
}

export default function VanDetail() {
    const vanPromise = useLoaderData()
    const location = useLocation()

    const search = location.state?.search || ""
    const type = location.state?.type || "all"




    function renderVan(van) {
        return (
            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>
                    {van.type}
                </i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
        )
    }
    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            <Suspense fallback={<h2>Loading...!</h2>}>
                <Await resolve={vanPromise.van}>
                    {(van) => renderVan(van)}
                </Await>
            </Suspense>
        </div>
    )
}