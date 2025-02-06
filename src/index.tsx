import {createRoot} from "react-dom/client";
import {App} from "./components/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ShopLazy from "@/pages/shop/Shop.lazy";
import {Suspense} from "react";
import AboutLazy from "@/pages/about/About.lazy";

const root = document.getElementById('root')

if(!root) {
    throw  new Error('root not found')
}

const container = createRoot(root)

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/about',
                element: <Suspense><AboutLazy /></Suspense>
            },
            {
                path: '/shop',
                element: <Suspense><ShopLazy /></Suspense>
            }
        ]
    },
]);

container.render(
    <RouterProvider router={router} />
)