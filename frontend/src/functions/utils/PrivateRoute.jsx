import { Navigate } from "react-router-dom"

export default function PrivateRoute({ Component }) {
    const isAuthenticated = localStorage.getItem('token')
    return isAuthenticated ? Component : <Navigate to="/api/v1/signin" />
}