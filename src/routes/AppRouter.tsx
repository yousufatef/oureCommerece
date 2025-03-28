import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const ProfileLayout = lazy(() => import("@layouts/ProfileLayout/profileLayout"));
// pages
const Home = lazy(() => import("@pages/Home"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Categories = lazy(() => import("@pages/Categories"));
const Cart = lazy(() => import("@pages/Cart"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Profile = lazy(() => import("@pages/Profile"));
const Orders = lazy(() => import("@pages/Orders"));
import { LottieHandler, PageSuspenseFallback } from "@components/feedback";
import NotFound from "@pages/NotFound";
import ProtectedRoute from "@components/Auth/ProtectedRoute";
// protect route 

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense
                fallback={
                    <div style={{ marginTop: "10%" }}>
                        <LottieHandler type="loading" message="Loading please wait..." />
                    </div>
                }
            >
                <MainLayout />
            </Suspense>
        ),
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: (
                    <PageSuspenseFallback>
                        <Home />
                    </PageSuspenseFallback>
                ),
            },
            {
                path: "/cart",
                element: (
                    <PageSuspenseFallback>
                        <Cart />
                    </PageSuspenseFallback>
                ),
            },
            {
                path: "/wishlist",
                element: (
                    <ProtectedRoute>
                        <PageSuspenseFallback>
                            <Wishlist />
                        </PageSuspenseFallback>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/categories",
                element: (
                    <PageSuspenseFallback>
                        <Categories />
                    </PageSuspenseFallback>
                ),
            },
            {
                path: "/categories/products/:prefix",
                element: (
                    <PageSuspenseFallback>
                        <Products />
                    </PageSuspenseFallback>
                ),
                loader: ({ params }) => {
                    if (
                        typeof params.prefix !== "string" ||
                        !/^[a-z]+$/i.test(params.prefix)
                    ) {
                        throw new Response("Bad Request", {
                            statusText: "Category not found",
                            status: 400,
                        });
                    }
                    return true;
                },
            },
            {
                path: "about-us",
                element: (
                    <PageSuspenseFallback>
                        <AboutUs />
                    </PageSuspenseFallback>
                ),
            },
            {
                path: "login",
                element: (
                    <PageSuspenseFallback>
                        <Login />
                    </PageSuspenseFallback>
                ),
            },
            {
                path: "register",
                element: (
                    <PageSuspenseFallback>
                        <Register />
                    </PageSuspenseFallback>
                ),
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <PageSuspenseFallback>
                            <ProfileLayout />
                        </PageSuspenseFallback>
                    </ProtectedRoute>
                ),
                children: [
                    { index: true, element: <ProtectedRoute><Profile /></ProtectedRoute> },
                    { path: "orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
                ]
            },
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;