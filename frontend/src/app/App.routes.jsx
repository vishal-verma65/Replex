import {createBrowserRouter, Navigate} from "react-router-dom"
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Protected from "../features/auth/components/Protected"
import Dashboard from "../features/chat/pages/Dashboard"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Dashboard /></Protected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <Navigate to="/" replace />
    },
])