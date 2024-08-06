import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as vansLoader } from "./pages/Vans/Vans"
import VanDetail, { loader as vanDetail } from "./pages/Vans/VanDetail"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans, { loader as hostVan } from "./pages/Host/HostVans"
import HostVanDetail, { loader as hostVanDetail } from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPricing from "./pages/Host/HostVanPricing"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import NotFound from "./pages/NotFound"
import Login, { loginLoader } from "./pages/Login"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import Error from "./components/Error"

import "./server"
import { requireAuth } from './utils';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route
      path="login"
      element={<Login />}
      loader={loginLoader}
    />
    <Route
      path="vans"
      element={<Vans />}
      errorElement={<Error />}
      loader={vansLoader}
    />
    <Route path="vans/:id" element={<VanDetail />} loader={vanDetail} />

    <Route path="host" element={<HostLayout />}>
      <Route index
        element={<Dashboard />}
        loader={async () => {
          return await requireAuth()
        }} />

      <Route path="income"
        element={<Income />}
        loader={async () => {
          return await requireAuth()
        }} />

      <Route path="reviews"
        element={<Reviews />}
        loader={async () => {
          return await requireAuth()
        }} />

      <Route path="vans"
        element={<HostVans />}
        loader={hostVan}
      />

      <Route path="vans/:id"
        element={<HostVanDetail />}
        loader={hostVanDetail}>
        <Route index
          element={<HostVanInfo />}
          loader={async () => {
          }} />

        <Route path="pricing"
          element={<HostVanPricing />}
          loader={async () => {
          }} />

        <Route path="photos"
          element={<HostVanPhotos />}
          loader={async () => {
            return await requireAuth()
          }} />

      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);